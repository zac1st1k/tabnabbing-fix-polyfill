beforeAll(() => {
  document.body.innerHTML = `
    <a href="#">no target</a><br>
    <a href="#" target="_blank">no rel</a><br>
    <a href="#" target="_blank" rel="nofollow">rel="nofollow"</a><br>
    <a href="#" target="_blank" rel="noopener">rel="noopener"</a><br>
    <a href="#" target="_blank" rel="noreferrer">rel="noreferrer"</a><br>
    <a href="#" target="_blank" rel="noopener noreferrer">rel="noopener noreferrer"</a><br>
    <a href="#" target="_blank" rel="nofollow">rel="nofollow"</a><br>
    <a href="#" target="_blank" rel="opener">rel="opener"</a><br>
  `;
  require('./tabnabbing-fix-polyfill.js');
});

afterEach(() => {
  document.body.innerHTML = '';
});

test('should make target=_blank imply noopener', () => {
  expect(document.body.innerHTML).toBe(`
    <a href="#">no target</a><br>
    <a href="#" target="_blank" rel="noopener">no rel</a><br>
    <a href="#" target="_blank" rel="nofollow noopener">rel="nofollow"</a><br>
    <a href="#" target="_blank" rel="noopener">rel="noopener"</a><br>
    <a href="#" target="_blank" rel="noreferrer noopener">rel="noreferrer"</a><br>
    <a href="#" target="_blank" rel="noopener noreferrer">rel="noopener noreferrer"</a><br>
    <a href="#" target="_blank" rel="nofollow noopener">rel="nofollow"</a><br>
    <a href="#" target="_blank" rel="opener">rel="opener"</a><br>
  `)
});

test('should add opener for target="_blank"', done => {
  document.body.innerHTML = '<a href="#" target="_blank">link</a>';
  setTimeout(() => {
    expect(document.body.innerHTML).toBe('<a href="#" target="_blank" rel="noopener">link</a>');
    done();
  });
});
