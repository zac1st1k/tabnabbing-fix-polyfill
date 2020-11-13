"use strict";

beforeAll(function () {
  document.body.innerHTML = "\n    <a href=\"#\">no target</a><br>\n    <a href=\"#\" target=\"_blank\">no rel</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"nofollow\">rel=\"nofollow\"</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"noopener\">rel=\"noopener\"</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"noreferrer\">rel=\"noreferrer\"</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\">rel=\"noopener noreferrer\"</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"nofollow\">rel=\"nofollow\"</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"opener\">rel=\"opener\"</a><br>\n  ";

  require('./tabnabbing-fix-polyfill.js');
});
afterEach(function () {
  document.body.innerHTML = '';
});
test('should make target=_blank imply noopener', function () {
  expect(document.body.innerHTML).toBe("\n    <a href=\"#\">no target</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"noopener\">no rel</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"nofollow noopener\">rel=\"nofollow\"</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"noopener\">rel=\"noopener\"</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"noreferrer noopener\">rel=\"noreferrer\"</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\">rel=\"noopener noreferrer\"</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"nofollow noopener\">rel=\"nofollow\"</a><br>\n    <a href=\"#\" target=\"_blank\" rel=\"opener\">rel=\"opener\"</a><br>\n  ");
});
test('should add opener for target="_blank"', function (done) {
  document.body.innerHTML = '<a href="#" target="_blank">link</a>';
  setTimeout(function () {
    expect(document.body.innerHTML).toBe('<a href="#" target="_blank" rel="noopener">link</a>');
    done();
  });
});
test('should add opener for child target="_blank"', function (done) {
  document.body.innerHTML = '<div><a href="#" target="_blank">link</a></div>';
  setTimeout(function () {
    expect(document.body.innerHTML).toBe('<div><a href="#" target="_blank" rel="noopener">link</a></div>');
    done();
  });
});