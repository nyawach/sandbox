from langchain_openai import ChatOpenAI
from browser_use import Agent
import asyncio

llm = ChatOpenAI(model="gpt-4o-mini")

async def main():
    agent = Agent(
        task="""
        食べログというグルメサイトに投稿している個人の口コミ記事の、コメントと画像のURLを1件取得してください。

        ## 事前情報

        - 対象URL: https://tabelog.com

        ## アクセス方法

        [マイページ] → [行ったお店] ランクや訪問日、コメントの一部が記載された箇所をクリックすることで確認できます。
        """,
        llm=llm,
    )
    result = await agent.run()
    print(result)

if __name__ == '__main__':
	asyncio.run(main())
