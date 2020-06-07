/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type openPage = typeof import('./steps/OpenPage.js');
type CustomHelper = import('./helpers/customhelper_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: CodeceptJS.I, openPage: openPage }
  interface CallbackOrder { [0]: CodeceptJS.I; [1]: openPage }
  interface Methods extends CodeceptJS.Puppeteer, CustomHelper {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
