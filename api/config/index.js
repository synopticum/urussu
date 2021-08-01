require("dotenv").config();

const {
  ENV,
  PORT,
  URI,
  HOST,
  VK_SERVICE_KEY,
  VK_CLIENT_ID,
  VK_CLIENT_SECRET,
  VK_API_VERSION,
  IDENTITY_POOL_ID,
  DB_HOST,
  DB_ADMIN_USERNAME,
  DB_ADMIN_PASSWORD,
} = process.env;

if (
  !PORT ||
  !URI ||
  !VK_SERVICE_KEY ||
  !VK_CLIENT_ID ||
  !VK_CLIENT_SECRET ||
  !VK_API_VERSION
) {
  const checkMark = "\x1b[32m✔";
  const xMark = "\x1b[31m✘";

  throw new Error(`
        Some required params haven't been provided:
        
        \x1b[37m Environment:-------------------${
          ENV ? `${ENV} ${checkMark}` : xMark
        }
        \x1b[37m Port:--------------------------${
          PORT ? `${PORT} ${checkMark}` : xMark
        }
        \x1b[37m Server URI:--------------------${
          URI ? `${URI} ${checkMark}` : xMark
        }
        \x1b[37m VK Service Key:----------------${
          VK_SERVICE_KEY ? `${VK_SERVICE_KEY} ${checkMark}` : xMark
        }
        \x1b[37m VK Client ID:------------------${
          VK_CLIENT_ID ? `${VK_CLIENT_ID} ${checkMark}` : xMark
        }
        \x1b[37m VK Client Secret:--------------${
          VK_CLIENT_SECRET ? `${VK_CLIENT_SECRET} ${checkMark}` : xMark
        }
        \x1b[37m VK API Version:----------------${
          VK_API_VERSION ? `${VK_API_VERSION} ${checkMark}` : xMark
        }
        \x1b[37m AWS Cognite Identity Pool ID:--${
          IDENTITY_POOL_ID ? `${IDENTITY_POOL_ID} ${checkMark}` : xMark
        }
        \x1b[37m`);
}

module.exports = {
  ENV,
  PORT,
  URI,
  HOST,
  VK_SERVICE_KEY,
  VK_CLIENT_ID,
  VK_CLIENT_SECRET,
  VK_API_VERSION,
  IDENTITY_POOL_ID,
  DB_HOST,
  DB_ADMIN_USERNAME,
  DB_ADMIN_PASSWORD,
};
