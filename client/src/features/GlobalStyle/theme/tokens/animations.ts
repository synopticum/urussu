export default {
  bounce: (property: string, from: string, to: string): string => {
    return `
       @keyframes bounce {
          0%,
          100% {
            ${property}: ${from};
          }
          50% {
            ${property}: ${to};
          }
       }
    `;
  },
};
