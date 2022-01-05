<template>
  <!--    聊天界面的布局-->
  <div style="display: flex">
<!--    侧边栏-->
    <ChatAside />

    <router-view style="flex: 1;margin-right: 20px;"/>
  </div>
</template>

<script>
import ChatAside from "@/components/ChatAside";
export default {
  name: "ChatLayout",
  components: {ChatAside}
}
</script>

<style scoped>

</style>