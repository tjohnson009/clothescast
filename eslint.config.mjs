import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    "extends": "airbnb-base"
  }, 
  
];

// module.exports = {
//   extends: [
//     'airbnb-base',
//   ],
//   languageOptions: {
//     globals: globals.browser,
//   },
//   plugins: [
//     'import',
//   ],
//   rules: {
//     // Add custom rules here
//   },
// };