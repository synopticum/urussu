const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { installMockStorage } = require('@shopify/jest-dom-mocks');

if (typeof window !== 'undefined') {
  const noop = () => {};
  Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
}
installMockStorage();
enzyme.configure({ adapter: new Adapter() });
