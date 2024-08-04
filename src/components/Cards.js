import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export function Entry({ link, name, content }) {
    return (<div className="project">
        <div className="flex">
            <b><a href={link} target="_blank" rel="noopener noreferrer">{name}</a></b>
            <p>{content}</p>
        </div>
    </div>);
}
export function Maven({ name, link, group, artifact }) {
    return (<div>
        <Tabs>
            <TabItem value="maven" label="Maven" default>
                <pre>
                    <code>
                        &lt;repository&gt;<br></br>
                        &nbsp;&nbsp;&lt;id&gt;{name}&lt;/id&gt;<br></br>
                        &nbsp;&nbsp;&lt;name&gt;{name}&lt;/name&gt;<br></br>
                        &nbsp;&nbsp;&lt;url&gt;{link}&lt;/url&gt;<br></br>
                        &lt;/repository&gt;<br></br>
                        <br></br>
                        &lt;dependency&gt;<br></br>
                        &nbsp;&nbsp;&lt;groupId&gt;{group}&lt;/groupId&gt;<br></br>
                        &nbsp;&nbsp;&lt;artifactId&gt;{artifact}&lt;/artifactId&gt;<br></br>
                        &nbsp;&nbsp;&lt;version&gt;$&#123;{artifact}_version&#125;&lt;/version&gt;<br></br>
                        &lt;/dependency&gt;
                    </code>
                </pre>
            </TabItem>
            <TabItem value="kotlin" label="Gradle Kotlin">
                <pre>
                    <code>
                        maven &#123;<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;name = "{name}"<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;url = uri("{link}")<br></br>
                        &#125;<br></br>
                        <br></br>
                        implementation("{group}:{artifact}:$&#123;{artifact}_version&#125;")
                    </code>
                </pre>
            </TabItem>
            <TabItem value="groovy" label="Gradle Groovy">
                <pre>
                    <code>
                        maven &#123;<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;name "{name}"<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;url "{link}"<br></br>
                        &#125;<br></br>
                        <br></br>
                        implementation "{group}:{artifact}:$&#123;{artifact}_version&#125;"
                    </code>
                </pre>
            </TabItem>
            <TabItem value="sbt" label="SBT">
                <pre>
                    <code>
                        resolvers +=<br></br>
                        &nbsp;&nbsp;"{name}"<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;at "{link}"<br></br>
                        <br></br>
                        "{group}" %% "{artifact}" %% "$&#123;{artifact}_version&#125;"
                    </code>
                </pre>
            </TabItem>
        </Tabs>
    </div>);
}