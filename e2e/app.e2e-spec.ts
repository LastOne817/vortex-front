import { VortexFrontPage } from './app.po';

describe('vortex-front App', () => {
  let page: VortexFrontPage;

  beforeEach(() => {
    page = new VortexFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
