const method = `
<template>
    <upload :uploadUrl="imgUploadUrl" :imageUrl="imageUrl" multiple :height="'60px'" @multiple-upload-sucess="onMultipleUploadSuccess" @multiple-upload-cancel="onMultipleUploadCancel" :defaultList="fileList">
    </upload>
    <div v-for="file in fileList">
        <p>文件名：{{file.name}}</p>
        <p>url：{{file.url}}</p>
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
export default class Demo extends View {
    // 多文件上传时的文件列表
    protected fileList: Array<any> = [];
    protected mounted() {
        this.fileList = [
            {
                name: "file1",
                url: "https://cn.vuejs.org/images/logo.png"
            },
            {
                name: "file2",
                url:
                    "https://www.baidu.com/img/bd_logo1.png?qua=high&where=super"
            }
        ];
    }
    // 多文件上传
    protected onMultipleUploadSuccess(file: any) {
        console.log(file);
        this.fileList.push(file);
    }
    protected onMultipleUploadCancel(file: any) {
        this.fileList = this.fileList.filter(value => file.url !== value.url);
    }
}
</script>`;
export default method;
