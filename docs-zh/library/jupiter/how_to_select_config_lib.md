---
title: 如何选择配置库
sidebar_position: 0
---

# 如何选择配置库

**建设中**

<div >
<table><thead>

<tr><th>配置系统</th><th></th><th>(Neo)Forge 配置系统</th><th></th><th></th><th></th><th>Cloth Config API</th><th>Jupiter</th><th>FTB Library</th><th>owo-lib</th><th>MaLiLib&amp;MaFgLib</th></tr>
</thead>
<tbody>

<tr><td></td><td></td><td>独立</td><td>配合 Configured</td><td>配合 Forge Config Screens</td><td>配合 Jupiter</td><td></td><td></td><td></td><td></td><td></td></tr>

<tr><td>元信息</td><td>仅用于配置系统</td><td>/</td><td>/</td><td>/</td><td>/</td><td>√</td><td>√</td><td>×</td><td>×</td><td>×</td></tr>

<tr><td></td><td>有文档</td><td>√</td><td>/</td><td>/</td><td>/</td><td>√</td><td>√</td><td>×</td><td>√</td><td>×</td></tr>

<tr><td>配置创建</td><td>创建新配置</td><td>√</td><td>/</td><td>/</td><td>/</td><td>√</td><td>√</td><td>√</td><td>√</td><td>√</td></tr>

<tr><td></td><td>基础值类型</td><td>√</td><td>/</td><td>/</td><td>/</td><td>√</td><td>√</td><td>√</td><td>√</td><td>√</td></tr>

<tr><td></td><td>复杂值类型<br></br>（自定义类与 Record）</td><td>×</td><td>/</td><td>/</td><td>/</td><td>√</td><td>√</td><td>√</td><td>√</td><td>√</td></tr>

<tr><td></td><td>按键绑定支持</td><td>×</td><td>/</td><td>/</td><td>/</td><td>√</td><td>×</td><td>×</td><td>?</td><td>√</td></tr>

<tr><td></td><td>基于反射的创建</td><td>×</td><td>/</td><td>/</td><td>/</td><td>√</td><td>部分</td><td>×</td><td>√</td><td>×</td></tr>

<tr><td></td><td>数值校验<br></br>（含范围）</td><td>√</td><td>/</td><td>/</td><td>/</td><td>×</td><td>√</td><td>√</td><td>√</td><td>√</td></tr>

<tr><td></td><td>注释</td><td>√</td><td>/</td><td>/</td><td>/</td><td>√</td><td>√</td><td>√</td><td>×</td><td>√</td></tr>

<tr><td>配置编辑</td><td>无需重启重载</td><td>√</td><td>/</td><td>/</td><td>/</td><td>×</td><td>√</td><td>?</td><td>?</td><td>×</td></tr>

<tr><td></td><td>生成配置界面</td><td>部分</td><td>√</td><td>√</td><td>√</td><td>√</td><td>√</td><td>√</td><td>√</td><td>手动</td></tr>

<tr><td></td><td>List&lt;Enum&gt; 编辑</td><td>×</td><td>部分</td><td>部分</td><td>部分</td><td>?</td><td>√</td><td>?</td><td>?</td><td>手动</td></tr>

<tr><td></td><td>模组列表界面集成</td><td>手动</td><td>√</td><td>√</td><td>可选</td><td>手动</td><td>手动</td><td>×</td><td>手动</td><td>手动</td></tr>

<tr><td></td><td>自定义背景</td><td>×</td><td>√</td><td>√</td><td>×</td><td>√</td><td>×</td><td>?</td><td>√</td><td>手动</td></tr>

<tr><td>多人游戏</td><td>同步到客户端</td><td>√</td><td>/</td><td>/</td><td>/</td><td>×</td><td>手动</td><td>√</td><td>√</td><td>×</td></tr>

<tr><td></td><td>同步报错</td><td>×</td><td>×</td><td>×</td><td>×</td><td>×</td><td>×</td><td>×</td><td>√</td><td>×</td></tr>

<tr><td></td><td>远程编辑</td><td>×</td><td>×</td><td>√</td><td>√</td><td>×</td><td>√</td><td>√</td><td>×</td><td>×</td></tr>

<tr><td></td><td>远程编辑<br></br>权限控制</td><td>/</td><td>/</td><td>仅 OP</td><td>仅 OP</td><td>/</td><td>√</td><td>仅 OP</td><td>/</td><td>/</td></tr>

<tr><td>格式</td><td>TOML</td><td>√</td><td>/</td><td>/</td><td>/</td><td>√</td><td>×</td><td>×</td><td>×</td><td>手动</td></tr>

<tr><td></td><td>JSON</td><td>×</td><td>/</td><td>/</td><td>/</td><td>√</td><td>√</td><td>×</td><td>√</td><td>手动</td></tr>

<tr><td></td><td>YAML</td><td>×</td><td>/</td><td>/</td><td>/</td><td>√</td><td>×</td><td>×</td><td>×</td><td>手动</td></tr>

<tr><td></td><td>其他</td><td>×</td><td>/</td><td>/</td><td>/</td><td>手动</td><td>×</td><td>SNBT</td><td>×</td><td>手动</td></tr>

<tr><td>其他</td><td>配置数据修复器</td><td>×</td><td>/</td><td>/</td><td>/</td><td>×</td><td>√</td><td>×</td><td>×</td><td>×</td></tr>

<tr><td></td><td>建议端</td><td>两端</td><td>/</td><td>/</td><td>/</td><td>客户端</td><td>两端</td><td>两端</td><td>两端</td><td>客户端</td></tr>
</tbody>
</table>
</div>
