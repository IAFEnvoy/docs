import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

function Card({ title, body, link, linkTitle = 'View documentation' }) {
    return (
        <article className="card link-card">
            <div className="card__header">
                <h3>{title}</h3>
            </div>
            <div className="card__body">
                <p>{body}</p>
            </div>
            {link && (
                <div className="card__footer">
                    <Link to={link} className="button button--secondary button--block">
                        {linkTitle}
                    </Link>
                </div>
            )}
        </article>
    );
}

export function Entry({ link, name, content, linkTitle = 'View documentation' }) {
    return <Card title={name} body={content} link={link} linkTitle={linkTitle} />;
}

export function Maven({ name, link, group, artifact }) {
    const version = '${' + artifact + '_version}';
    const snippets = {
        maven: `<repository>\n  <id>${name}</id>\n  <name>${name}</name>\n  <url>${link}</url>\n</repository>\n\n<dependency>\n  <groupId>${group}</groupId>\n  <artifactId>${artifact}</artifactId>\n  <version>${version}</version>\n</dependency>`,
        kotlin: `maven {\n    name = "${name}"\n    url = uri("${link}")\n}\n\nimplementation("${group}:${artifact}:${version}")`,
        groovy: `maven {\n    name "${name}"\n    url "${link}"\n}\n\nimplementation "${group}:${artifact}:${version}"`,
        sbt: `resolvers += "${name}" at "${link}"\n\n"${group}" %% "${artifact}" %% "${version}"`,
    };

    return <Tabs>
        <TabItem value="maven" label="Maven" default><pre><code>{snippets.maven}</code></pre></TabItem>
        <TabItem value="kotlin" label="Gradle Kotlin"><pre><code>{snippets.kotlin}</code></pre></TabItem>
        <TabItem value="groovy" label="Gradle Groovy"><pre><code>{snippets.groovy}</code></pre></TabItem>
        <TabItem value="sbt" label="SBT"><pre><code>{snippets.sbt}</code></pre></TabItem>
    </Tabs>;
}
