test('should add noopener for target="_blank"', () => {
  const anchor = document.createElement('A');
  anchor.id = '_blank';
  anchor.innerHTML = "click me";
  anchor.href = 'https://www.test.com';
  anchor.target = '_blank';
  document.body.appendChild(anchor);
  setTimeout(() =>
    expect(document.findElementById('_blank').innerHTML).toBe('<a href="https://www.test.com" target="_blank" rel="noopner">click me</a>')
  );
});
