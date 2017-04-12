import { KnockerWebPage } from './app.po';

describe('knocker-web App', () => {
  let page: KnockerWebPage;

  beforeEach(() => {
    page = new KnockerWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
