import { Marker, DomUtil, DragEndEvent } from 'leaflet';

export const useRotatedMarker = (): void => {
  // save these original methods before they are overwritten
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const proto_initIcon = Marker.prototype._initIcon;
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const proto_setPos = Marker.prototype._setPos;

  Marker.addInitHook(function () {
    const iconOptions = this.options.icon && this.options.icon.options;
    let iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
    if (iconAnchor) {
      iconAnchor = iconAnchor[0] + 'px ' + iconAnchor[1] + 'px';
    }
    this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom';
    this.options.rotationAngle = this.options.rotationAngle || 0;

    // Ensure marker keeps rotated during dragging
    this.on('drag', function (e: DragEndEvent) {
      e.target._applyRotation();
    });
  });

  Marker.include({
    _initIcon: function () {
      proto_initIcon.call(this);
    },

    _setPos: function (pos: { x: number; y: number }) {
      proto_setPos.call(this, pos);
      this._applyRotation();
    },

    _applyRotation: function () {
      if (this.options.rotationAngle) {
        this._icon.style[DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;

        this._icon.style[DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
      }
    },

    setRotationAngle: function (angle: number) {
      this.options.rotationAngle = angle;
      this.update();
      return this;
    },

    setRotationOrigin: function (origin: number) {
      this.options.rotationOrigin = origin;
      this.update();
      return this;
    },
  });
};
