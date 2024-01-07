<template xmlns="http://www.w3.org/1999/html">
<div class="testing">
  <h1>Тестировочная</h1>
  <mis-block class="container">
<!--    <iframe id="iframe">-->

<!--    </iframe>-->
    <mis-button id="authorize_button" @click="gmailAuth">Авторизоваться</mis-button>
    <mis-button @click="startListening">Начать Слушание</mis-button>
    <div class="messages">
<!--      <p id="content"></p>-->
      <div id="image"></div>
      <div class="messages__inner" v-for="(message, index) in messagesResponse">
        <div class="inner__container">
          <p class="from">({{index}}) От: {{message.result.payload.headers.filter(header => header.name === 'From')[0].value}}</p>
          <p class="subject">Тема: {{message.result.payload.headers.filter(header => header.name === 'Subject')[0].value}}</p>
        </div>
        <p class="snippet">{{message.result.snippet}}</p>
      </div>
    </div>
  </mis-block>
</div>
</template>

<script>
import GmailMixin from "@/mixins/GmailMixin";
import {Base64} from "js-base64";
import vkMethodsMixin from "@/mixins/VkMethodsMixin";
import {log} from "util";

export default {
  name: "TestingView",
  mixins: [GmailMixin],
  methods: {
    messageDecoder(message) {
      return Base64.decode(
          message.result.payload.parts
              .filter(part => part.mimeType === 'text/plain')[0].body.data
              .replace(/-/g, '+').replace(/_/g, '/')
      )
    },
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 30px;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.messages__inner {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  padding: 4px 8px;
  border-radius: 4px;
  overflow: hidden;
  .snippet {
    color: $light;
    word-wrap: break-word;
  }
  .inner__container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: hotpink;
    padding-bottom: 6px;
    border-bottom: 1px solid hotpink;
  }
}
</style>