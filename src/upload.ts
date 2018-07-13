import { component, config, watch, Component } from "flagwind-web";
import Cookies from "js-cookie";

import "./upload.less";

@component({
    template: require("./upload.html")
})
export default class Upload extends Component {
    // 上传组件的宽度
    @config({ default: "100%" })
    public width: String;
    // 上传组件的高度
    @config({ default: "200px" })
    public height: String;
    // 上传的服务url
    @config({ default: "" })
    public uploadUrl: String;
    // 图片的url地址
    @config({ default: "" })
    public imageUrl: String;
    // 携带的参数
    @config({ default: {} })
    public data: any;
    // 是否多选
    @config({ default: false })
    public multiple: boolean;
    @config({ default: 5 })
    public maxFileNum: Number;
    // 多文件上传时默认以上传的文件
    @config({ default: [] })
    public defaultList: Array<any> = [];
    // 文件上传最大大小，单位kb
    @config({default: 4096})
    public maxSize: Number;
    // 多文件上传时 上传的文件列表
    public uploadList: Array<any> = [];
    // 预览图片框是否显示
    public visible: Boolean = false;
    // 预览图片的url地址
    public scanUrl: String = "";
    // 上传图片的对象参数
    public image: any = {
        name: "",
        url: "",
        status: "",
        showProgress: false,
        percentage: 0
    };
    // 得到样式信息
    public get style(): any {
        return {
            height: this.height,
            width: this.width,
            lineHeight: this.height
        };
    }
    // 图片上传成功时，处理方法
    public handleImgSuccess(response: any, file: any, fileList: Array<any>) {
        if (!response.hasError) {
            this.image.name = file.name;
            this.image.url = response.result;
        } else {
            this.$notice.error({ title: response.message });
            return ;
        }
        this.image.percentage = file.percentage;
        this.image.showProgress = file.showProgress;
        this.image.status = file.status;
        this.onUploadSuccess();
    }
    // 图片上传成功时，图片格式有问题
    public handleFormatError(file: any): void {
        this.$notice.warning({
            title: "文件格式不正确",
            desc: file.name + "的文件格式是不正确的,请选择jpg或者png"
        });
    }
    // 图片上传成功时，控制文件最大大小
    public handleMaxSize(file: any): void {
        this.$notice.warning({
            title: "上传文件大小限制",
            desc: "文件  " + file.name + " 太大了，不要超过" + this.maxSize + "kb"
        });
    }
    // 上传图片的url
    public get imgUploadUrl(): String {
        return this.uploadUrl;
    }
    // 上传的请求头部
    public get uploadHeaders(): any {
        return this.getHead();
    }
    // 将上传成功后的url传给父页面
    public onUploadSuccess(): void {
        this.$emit("upload-sucess", this.image.url);
    }
    // 点击作废图标的时候执行
    public handleUploadTrash(): void {
        this.image.name = "";
        this.image.url = "";
        this.image.status = "";
        this.image.showProgress = false;
        this.image.percentage = 0;
        this.$emit("upload-cancel");
    }
    // 上传请求头部
    public getHead(): any {
        let token = Cookies.get("access_token");
        let headers = {
            Authorization: "Bearer " + token
        };
        return headers;
    }
    // 返回携带的参数
    public get getDatas(): any {
        return this.data;
    }
    // 上传的图片预览
    public handleView(item: any) {
        this.scanUrl = item.url;
        this.visible = true;
    }
    // 获得图片的地址
    public get getUrl(): String {
        return this.image.url;
    }

    // 设置图片的url
    public setUrl(url: string) {
        this.image.url = url;
        if (url) {
            this.image.status = "finished";
        } else {
            this.image.status = "";
        }
    }
    // 对imageUrl 进行监听
    @watch("imageUrl", { immediate: true })
    public change(nv: any, ov: any) {
        this.setUrl(nv);
    }
    /**
     * 多选上传成功钩子函数
     * @param response 
     * @param file 
     * @param fileList 
     */
    public handleMultipleSuccess(response: any, file: any, fileList: Array<any>) {
        // 上传成功的file会自动被push到(<any>this.$refs.multipleUpload).fileList中，
        // 而我们将(<any>this.$refs.multipleUpload).fileList于uploadList绑定为同一个变量，所以不用手动push
        if (!response.hasError) {
            file.name = file.name;
            file.url = response.result;
            // this.uploadList.push(arr);
            // (<any>this.$refs.multipleUpload).fileList.push(arr);
        } else {
            this.$notice.error({ title: response.message });
            // return false;
        }
        file.percentage = file.percentage;
        file.showProgress = file.showProgress;
        file.status = file.status;
        this.uploadList = (<any>this.$refs.multipleUpload).fileList;
        if(file.uid === fileList[fileList.length - 1].uid) {
            this.$emit("multiple-upload-sucess", fileList);
        }
    }
    /**
     * 多文件上传删除某个文件
     * @param file 
     */
    public handleRemove(file: any) {
        this.uploadList = this.uploadList.filter(value => file.url !== value.url);
        (<any>this.$refs.multipleUpload).fileList = this.uploadList;
        this.$emit("multiple-upload-cancel", file);
    }
    /**
     * 多个文件上传时验证上传文件个数
     */
    public handleBeforeUpload(files: any) {
        let check = (<any>this.$refs.multipleUpload).fileList.length < this.maxFileNum;
        if (!check) {
            this.$message.warning(`最多只能上传${this.maxFileNum}个文件`);
        }
        return check;
    }
    public mounted() {
        if (this.multiple) { this.uploadList = (<any>this.$refs.multipleUpload).fileList; }
    }
    /**
     * 这里主要是处理默认上传list改变时，组件需要相应变化
     * @param nv 
     * @param ov 
     */
    @watch("defaultList")
    public changeDefaultList(nv: any, ov: any) {
        this.uploadList = this.defaultList.map(value => {
            let file: any = {};
            file.name = value.name;
            file.url = value.url;
            file.percentage = 100;
            file.status = "finished";
            return file;
        });
        (<any>this.$refs.multipleUpload).fileList = this.uploadList;
    }
}
