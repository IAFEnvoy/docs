// Loading failures remain visible inside the embedded editor.
try {
  const { initializeEditor } = await import('./editor.js');
  initializeEditor();
} catch (error) {
  document.getElementById('status').textContent = `编辑器加载失败：${error.message}。请刷新页面重试。`;
  console.error(error);
}
