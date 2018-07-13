const props = `
<template>
    <upload :uploadUrl="imgUploadUrl" :imageUrl="imageUrl" @upload-sucess="onUploadSuccess" @upload-cancel="onUploadCancel"></upload>
    <div>
        <p>url：{{imageUrl}}</p>
    </div>
</template>
<script lang="ts">
import { component, View } from "flagwind-web";
import Upload from "src/index";
import * as codes from "examples/codes";
@component({
    components: {
        upload: Upload
    }
})
export default class ImageUpload extends View {
    // 图片上传地址
    protected imgUploadUrl: string = "http://192.168.101.27:8080/unity/attachment/upload";
    // 图片地址
    protected imageUrl: string = "https://cn.vuejs.org/images/logo.png";
    // 单张图片上传成功后回调函数
    protected onUploadSuccess(url: string) {
        this.imageUrl = url;
    }
    // 单张图片上传点击取消
    protected onUploadCancel() {
        this.imageUrl = "";
    }
}
</script>`;
export default props;
