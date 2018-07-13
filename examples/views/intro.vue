<template>
    <l-generic>
        <div class="v-demo">
            <h1>图片上传组件</h1>
            <p style="color:red">图片上传请求时需要认证，直接运行本项目时请检测cookie中的access_token</p>
            <p>单张图片上传</p>
            <u-example title="配置项">
                <template slot="case">
                    <upload :uploadUrl="imgUploadUrl" :imageUrl="imageUrl" @upload-sucess="onUploadSuccess" @upload-cancel="onUploadCancel"></upload>
                    <div>
                        <p>url：{{imageUrl}}</p>
                    </div>
                </template>
                <template slot="desc">
                    <p>
                        <code>uploadUrl</code>属性指定文件上传的url</p>
                    <p>
                        <code>imageUrl</code>属性指定绑定组件显示的图片url</p>
                    <p>
                        <code>upload-sucess</code>事件为文件上传后的回调，参数为上传的图片url</p>
                    <p>
                        <code>upload-cancel</code>事件为点击删除按钮触发的事件</p>
                </template>
                <u-code slot="code" lang="html">{{codes.single}}</u-code>
            </u-example>
            <p>多张图片上传</p>
            <u-example title="配置项">
                <template slot="case">
                    <upload ref="m-upload" :uploadUrl="imgUploadUrl" :imageUrl="imageUrl" multiple :height="'60px'" @multiple-upload-sucess="onMultipleUploadSuccess" @multiple-upload-cancel="onMultipleUploadCancel" :defaultList="fileList">
                    </upload>
                    <div v-for="file in fileList">
                        <p>文件名：{{file.name}}</p>
                        <p>url：{{file.url}}</p>
                    </div>
                </template>
                <template slot="desc">
                    <p>
                        <code>multiple</code>属性指定为多文件上传</p>
                    <p>
                        <code>uploadUrl</code>属性指定文件上传的url</p>
                    <p>
                        <code>imageUrl</code>属性指定绑定组件显示的图片url</p>
                    <p>
                        <code>multiple-upload-sucess</code>事件为文件上传后的回调，参数为上传的文件fileList(包括默认已上传的文件list，如果初始有2个文件，上传3个则有五个)</p>
                    <p>
                        <code>multiple-upload-cancel</code>事件为点击删除按钮触发的事件，参数为上传的文件file</p>
                    
                </template>
                <u-code slot="code" lang="html">{{codes.multiple}}</u-code>
            </u-example>
            <div class="api">
                <h2>API</h2>
                <h3>配置属性</h3>
                <table>
                    <thead>
                        <tr>
                            <th>属性名</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>必填</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>width</td>
                            <td>组件宽度</td>
                            <td>String</td>
                            <td>-</td>
                            <td>100%</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>组件高度</td>
                            <td>String</td>
                            <td>-</td>
                            <td>200px</td>
                        </tr>
                        <tr>
                            <td>maxSize</td>
                            <td>文件大小限制，单位kb</td>
                            <td>Number</td>
                            <td>-</td>
                            <td>4096</td>
                        </tr>
                        <tr>
                            <td>uploadUrl</td>
                            <td>上传图片接口URL</td>
                            <td>String</td>
                            <td>是</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>imageUrl</td>
                            <td>单个上传图片时图片URL</td>
                            <td>String</td>
                            <td>-</td>
                            <td>""</td>
                        </tr>
                        <tr>
                            <td>data</td>
                            <td>上传时携带的参数</td>
                            <td>Object</td>
                            <td>-</td>
                            <td>{}</td>
                        </tr>
                        <tr>
                            <td>multiple</td>
                            <td>是否多选</td>
                            <td>boolean</td>
                            <td>-</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>maxFileNum</td>
                            <td>多图片上传文件个数限制</td>
                            <td>Number</td>
                            <td>-</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>defaultList</td>
                            <td>多图片上传文件默认已上传文件列表</td>
                            <td>Array</td>
                            <td>-</td>
                            <td>[]</td>
                        </tr>
                    </tbody>
                </table>
                <h3>实例方法</h3>
                <table>
                    <thead>
                        <tr>
                            <th>方法名</th>
                            <th>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <h3>事件</h3>
                <table>
                    <thead>
                        <tr>
                            <th>事件名</th>
                            <th>说明</th>
                            <th>参数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>upload-sucess</td>
                            <td>单文件上传成功回调函数</td>
                            <td>上传的文件在服务器存储的url</td>
                        </tr>
                        <tr>
                            <td>upload-cancel</td>
                            <td>单文件删除文件回调函数</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>multiple-upload-sucess</td>
                            <td>多文件上传成功回调函数</td>
                            <td>已上传文件列表fileList</td>
                        </tr>
                        <tr>
                            <td>multiple-upload-cancel</td>
                            <td>多文件删除文件回调函数</td>
                            <td>删除的文件file</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </l-generic>
</template>
<style lang="less" scoped>
.v-demo {
    padding: 20px 25px;
}
</style>
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
    protected codes: any = codes;
    // 图片上传地址
    protected imgUploadUrl: string = "http://192.168.101.27:8080/unity/attachment/upload";
    // 图片地址
    protected imageUrl: string = "https://cn.vuejs.org/images/logo.png";
    // 多文件上传时的文件列表
    protected fileList: Array<any> = [];
    // 单张图片上传成功后回调函数
    protected onUploadSuccess(url: string) {
        this.imageUrl = url;
    }
    // 单张图片上传点击取消
    protected onUploadCancel() {
        this.imageUrl = "";
    }
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
    protected onMultipleUploadSuccess(fileList: any) {
        console.log(fileList);
        this.fileList = [...fileList];
    }
    protected onMultipleUploadCancel(file: any) {
        this.fileList = this.fileList.filter(value => file.url !== value.url);
    }
}
</script>
