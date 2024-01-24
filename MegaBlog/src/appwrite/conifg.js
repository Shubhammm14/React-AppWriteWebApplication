import conf from "../conf/config"
import{Client,Id,Databases,Storage,Query} from 'appwrite';
export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,featureImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug,
                {
                   title,
                   content,
                   featureImage,
                   status,
                   userId,
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }
    async updatePost(slug,{title,content,featureImage,status}){
            try {
                return await this.databases.updateDocument(
                    conf.appWriteDatabaseID,
                    conf.appWriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featureImage,
                        status,
                    }
                )
            } catch (error) {
                console.log(error);
            }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,slug
            )
        } catch (error) {
            console.log(error)
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseID,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    //file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                Id.unique(),
                file
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId

            )
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    getFilePreview(fileId){
       return this.bucket.getFilePreview(
        conf.appWriteBucketId,
        fileId
       ) 
    }
}