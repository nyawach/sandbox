Simulator のリスト

```
$ xcrun xctrace list devices
```

Simualtor 立ち上げる
↑のリストの正確な名前じゃないとだめっぽい

```
$ xcrun instrument -w <device_name>
````

↓のほうが新しめっぽい

```
$ xcrun simctl
```

fzfから利用できるデバイスを抽出して起動するコマンド

```
$ xcrun simctl list devices --json | jq -r '.devices | flatten | .[] | select(.isAvailable == true) | .name' | fzf --print0 | xargs -0 xcrun simctl boot
```

Simulator で起動を確認するにはSimulatorアプリをopenする感じらしい

```
$ xcrun simctl list devices | grep Booted
    iPhone 12 Pro (CA5416EF-6C53-4D32-951D-8DA23233266D) (Booted) 
$ open -a "Simulator" --args -CurrentDeviceUDID CA5416EF-6C53-4D32-951D-8DA23233266D
```
