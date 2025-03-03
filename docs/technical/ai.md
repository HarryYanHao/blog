---
sidebar: 'auto'
sidebarDepth: 1
pageClass: common
---

# 现在，就是AI
[[toc]]
AI已然成为了近段时间的热词，从Openai的ChatGPT到先如今，短短一年，AI已经席卷了整个世界。各式各样的生产力工具如雨后春笋般借由AI的技术力量蓬勃发展。就比如你可能不会感知到，上述这段文字，大部份其实是由AI自动生成的。

作为一名开发，AI可以帮助我实现 文档的编写，测试用例的设计，代码的解释和修改。更甚者，我可以通过自然语言的描述，自动生成对应语言的代码，帮助我能快速的打破语言的壁垒，学习更为先进的技术。有些产品已经是用AI驱动的开发，不仅仅在IT行业，各行各业都能够借助AI的力量，简化流程，提升效率。

这篇笔记用于记录最近使用到的一些AI工具以及好用的插件

***现在，就是AI***

## 闭源模型
在很多场景下，AI工具已经能替代搜索引擎的作用。能够更为直接、快速的获取到所需要的信息，不需要人为的再进行二次过滤。

### [ChatGPT](https://chat.openai.com/)

ChatGPT当然不让，他就是AI界的代表，也是我接触的第一款AI工具。ChatGpt是由OpenAI推出的一款基于GPT-3.5的AI语言模型，可以回答各种问题、生成文本、翻译等。

ChatGPT 具有以下一些优点：

1.强大的语言理解和生成能力：能够理解复杂的语言结构和语义，生成连贯、有逻辑的文本回复。

2.广泛的知识覆盖：可以回答各种各样的问题，提供丰富的信息和见解。

3.可用于多种任务：如文本生成、问答、翻译、摘要等，具有较高的通用性。

4.提升工作效率：能帮助人们快速获取信息、生成初稿，节省时间和精力。

一些缺点：

1.网络连接不稳定：访问可能受到网络限制和不稳定因素的影响，导致使用体验不佳。

2.不符合中国法律和政策：使用境外未在境内备案的服务可能存在违反相关法律法规的风险。（需要翻墙）

3.需要付费且支付方式不够友好

### [豆包](https://www.doubao.com/chat)

由字节跳动公司基于云雀模型开发的。云雀模型使用了大量的文本数据进行训练，并应用了先进的机器学习技术和算法，具备知识解答，
语言学习，文本创作，逻辑分析等能力

### [文心一言](https://yiyan.baidu.com/)
文心一言是百度公司研发的知识增强大语言模型，英文名是ERNIE Bot。它能够与人对话互动，回答问题，协助创作，高效便捷地帮助人们获取信息、知识和灵感。

文心一言基于Transformer结构，是百度依托深厚的飞桨、文心大模型的技术研发的知识增强大语言模型，能够与人对话互动，回答问题，协助创作，高效便捷地帮助人们获取信息、知识和灵感。

文心一言的特点在于其强大的语言理解能力和知识增强特性。它能够深入理解用户输入的自然语言，并基于广泛的知识库进行推理和回答。同时，文心一言还具备持续学习的能力，能够不断优化和改进自身的性能。

在应用场景方面，文心一言可以广泛应用于各种领域，如智能客服、智能写作、智能问答等。它可以帮助企业提高客户服务质量，降低运营成本；也可以帮助个人提高写作效率，拓展创作思路。

总之，文心一言是百度公司研发的一款功能强大的知识增强大语言模型，具有广泛的应用前景和巨大的市场潜力。 （ai 生成）

## 开源模型
如果想自己尝试在本地搭建ai应用，我们可以使用开源模型。开源模型还可以通过数据集微调语言模型，让他能更了解你，成为你专属的ai助手。


另一个使用场景是搭建自己的知识库，基于开源语言模型，在知识库中快速的检索出需要的答案。

我在本地搭建的是 ollama+Open WebUI+qwen

知识库搭建的是anythingllm

### 本地搭建
#### ollama与ai大语言模型的搭建
:::tip
ollma官方镜像与文档

<https://hub.docker.com/r/ollama/ollama>
:::
```sh
docker pull ollama/ollama
#cpu only
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
#进入容器后执行
ollama run qwen2:1.5b
```
#### 可视化界面Open WebUI搭建
:::tip
Open WebUI官方镜像与文档

<https://github.com/open-webui/open-webui/pkgs/container/open-webui>
:::
```sh
docker pull ghcr.io/open-webui/open-webui:git-9682806-ollama
#If Ollama is on your computer, use this command:
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```
启动后浏览器访问localhost:3000即可使用可视化的方式操作大语言模型

#### 知识库搭建
:::tip
anythingllm官方镜像与文档

<https://github.com/Mintplex-Labs/anything-llm/blob/master/docker/HOW_TO_USE_DOCKER.md>
:::

```sh
#映射文件路径需要手动修改 $STORAGE_LOCATION
export STORAGE_LOCATION=$HOME/anythingllm && \
mkdir -p $STORAGE_LOCATION && \
touch "$STORAGE_LOCATION/.env" && \
docker run -d -p 3001:3001 \
--cap-add SYS_ADMIN \
-v ${STORAGE_LOCATION}:/app/server/storage \
-v ${STORAGE_LOCATION}/.env:/app/server/.env \
-e STORAGE_DIR="/app/server/storage" \
mintplexlabs/anythingllm
```
启动后浏览器访问localhost:3001即可使用可视化的方式操作知识库，他需要选择一个我们之前安装的大语言模型，例如我们之前安装的qwen2:1.5b。然后在界面中，我们上传需要的文档内容，将这些文档做为知识库，相当于是数据集微调大语言模型。然后就可以通过ai来检索出需要的答案了。