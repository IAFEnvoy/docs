/**
 * Download.jsx — 资源下载组件
 *
 * 根据传入的文件路径，从 static/resources/ 目录中找到对应资源并触发下载。
 *
 * 嵌入 Docusaurus .mdx 文件:
 *   import Download from '@site/src/components/Download';
 *   <Download filePath="example.zip">下载示例文件</Download>
 *
 * Props:
 *   - filePath: 资源在 static/resources/ 下的相对路径
 *   - children: 按钮/链接的显示文字 (可选，默认显示文件路径)
 *   - asButton: 是否渲染为按钮样式 (可选，默认 true)
 */

import React, { useCallback, useState } from 'react';
import { saveAs } from 'file-saver';

// ============================================================
// Styles
// ============================================================

const S = {
  link: {
    display: 'inline-block',
    padding: '8px 16px',
    color: 'var(--ifm-link-color)',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '0.95rem',
    background: 'none',
    border: 'none',
  },
  button: {
    display: 'inline-block',
    padding: '8px 20px',
    backgroundColor: 'var(--ifm-color-primary)',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
    transition: 'opacity 0.2s',
  },
  loading: {
    opacity: 0.65,
    pointerEvents: 'none',
  },
};

// ============================================================
// Component
// ============================================================

export default function Download({ filePath, children, asButton = true }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!filePath) return;

    const url = `/resources/${filePath.replace(/^\/+/, '')}`;
    setLoading(true);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`下载失败: ${res.status} ${res.statusText}`);
      }
      const blob = await res.blob();
      const filename = filePath.split('/').pop() || 'download';
      saveAs(blob, filename);
    } catch (err) {
      console.error('Download 组件下载出错:', err);
      alert(`无法下载文件: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [filePath]);

  const label = children || filePath.split('/').pop() || '下载';
  const style = {
    ...(asButton ? S.button : S.link),
    ...(loading ? S.loading : {}),
  };

  return (
    <button
      type="button"
      style={style}
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? '下载中...' : label}
    </button>
  );
}
