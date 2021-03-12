
# How to Run WEb-UI without Backend API
* First clone the project from GIT Repository.
* Then open Webui-asset folder and cretae new folder with name  "assets" Cut Paste all below folder available in webui-assets folder into asset folder.follow the below image

 ![ViewTree list](/docs/KT_Document_screenshots/asset%20Directory.png?raw=true "ViewTree list")
 
* then open web-ui folder with any frontend tool like VBC to make changes in code
* relpace all ajax call with random URl e.g https://dive-ec-gateway.run.aws-usw02-dev.ice.predix.io/health
  and mark data with proper JSON as per Ajax request or logic to run frontend Html pages with react js
  
* To open index.html page of project you need to open CMD command prompt  and need to execute below cammand with you repository path 
 "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="project directory path" so its remove Origin access error on front end



# Changes Done In Topology :
IN TreeValue object from displayDataFromLocalStorage method marked data with Json in the json i have provide Ids 
so its getting Display the list of list structure in graph please follow below image:

![ViewTree list](/docs/Ec%20Screenshot/View/ViewTreelist.png?raw=true "ViewTree list")

