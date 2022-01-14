<template>
  <div style="text-align: center;">
    <div style="font-size: 21px; padding: 20px;">
      <!--这是一段使用了i18n的文字，请看locales文件夹中的翻译文件-->
      <!--This is a text using i18n, please see the translation files in the locales folder-->
      {{ $t("welcome") }}
    </div>
    <div style="display: flex; justify-content: center;">
      <div
        class="home-button app-action-button"
      >
        {{ $t("Click Me!") }}
      </div>
      <div
        class="home-button app-action-button"
      >
        Click Me!!!
      </div>
    </div>
    <div @click="saveStore">本地存</div>
    <button @click="readFile">读取文件</button>
  </div>
</template>

<script>

const ipc = require("electron").ipcRenderer;
import Store from "electron-store";


export default {
    data() {
        return {
          
        };
    },
    methods: {
        saveStore(){
            const store = new Store();
            //如果需要加密存储 就用下面的
            //const store = new Store({encryptionKey: '加密值'});	
            store.set("unicorn", "sdgsdg ");
            const a = store.get("unicorn");
            console.log(a);
        },
        readFile(){
            ipc.on("asynchronous-reply", function(event, arg) {
                // 这里的arg是从主线程请求的数据
                console.log("render+" + arg);
            });
            ipc.send("asynchronous-message", "传递回去ping");
        },
    }

};
</script>

<style>
.home-button {
  color:#fff;
  background-color: #263238;
  opacity: 1;
  border-radius: 4px;
  cursor: pointer;
  height: 45px;
  width: 150px;
  margin: 10px 10px;
  text-align: center;
  line-height: 45px;
}
</style>
