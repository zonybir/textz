git 使用流程 

ssh-keygen -t rsa -C zonybir@icloud.com
		将生成得密匙 加载进 github里面

git init //初始化本地仓库

git config user.name 
 						user.email

git config github.name
 						github.token XXXXXXX
 						XXXXXX码由github上生成 顺序  settings ---->  Personal access tokens  ---->  Generate new token  // OVER

 				

本地仓库与github上仓库关联  

	git remote add origin git@server-name:path/repo-name.git；  //github项目的地址

git pull XXXXXX   拉下github项目到本地
		



git merge 分支X    把分支X加载到 当前分支里面

git push origin master    把master分支提交到github上 


	后续的git pull 设置默认 pull  origin 分支中得master   git pull git branch --set-upstream-to=origin/master 