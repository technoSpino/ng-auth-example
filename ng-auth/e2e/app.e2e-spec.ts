import { NgAuthPage } from './app.po';

describe('ng-auth App', () => {
  let page: NgAuthPage;

  beforeEach(() => {
    page = new NgAuthPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
