# components ディレクトリ

**※これは叩きです。必要に応じて変更してください。**

## 各ファイルについて

## `App.tsx`

アプリケーションルートとなるファイルです。

## ディレクトリ構成について

ディレクトリ構成の理解のしやすさから、Atomic Design風のディレクトリ構成にしています。

### `atoms/`

#### 判断基準

- 単語1つで表すことができる
- 単機能、あるいは一つのDOMで構成されている
- APIのレスポンス型に依存しない
- 入力を除き、 `useState` をもたない

#### ルール

- コンポーネントの接頭辞に `A` をつける
- hooksは配置しない

### `molecules/`

#### 判断基準

- 単語2つ以上で表すことができる
- 単機能、あるいは復数のAtomで構成されている
- APIのレスポンス型に依存しない
- hooksを配置する必要がある

#### ルール

- コンポーネントの接頭辞に `M` をつける

### `organisms/`

#### 判断基準

- 単語2つ以上で表すことができる
- 復数のAtomとMoleculeで構成されている
- APIのレスポンス型に依存する
- hooksを配置する必要がある

#### ルール

- コンポーネントの接頭辞に `O` をつける

### `templates/`

ページルーティングと対応したファイルを配置します。
場合によっては、同じ `template/` 階層のコンポーネントでも違う `pages/` で呼び出すことも許容します。

### `pages/`

ページルーティングにのみ利用します。

## ファイル構成について

`ComponentName` というコンポーネントを使う場合には、同じ階層に以下のファイルを配置します。

- `ComponentName.ts`: コンポーネントファイル
- `ComponentName.hooks.ts`: コンポーネント専用のhooks
- `ComponentName.stories.ts`: コンポーネント専用のStorybook
- `ComponentName.test.ts`: コンポーネント専用のテストファイル
- `ComponentName.css`: コンポーネント専用のCSSファイル
  + 必要あれば

ファイル数が多くなると感じた場合は、 `ComponentName/` ディレクトリを切ってください。

before

```
/path/to/component/
  ComponentName1.ts
  ComponentName1.hooks.ts
  ComponentName1.stories.ts
  ComponentName1.test.ts
  ComponentName1.css
  ComponentName2.ts
  ComponentName2.hooks.ts
  ComponentName2.stories.ts
  ComponentName2.test.ts
  ComponentName2.css
  ...
```

after

```
/path/to/component/
  ComponentName1/
    ComponentName1.ts
    ComponentName1.hooks.ts
    ComponentName1.stories.ts
    ComponentName1.test.ts
    ComponentName1.css
  ComponentName2/
    ComponentName2.ts
    ComponentName2.hooks.ts
    ComponentName2.stories.ts
    ComponentName2.test.ts
    ComponentName2.css
  ...
```
