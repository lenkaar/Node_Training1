function add(){
    let Name = document.getElementById('name').value;
    let Phone = document.getElementById('phone').value;
    let Email = document.getElementById('email').value;
    let Password = document.getElementById('password-1').value;
    let CPassword = document.getElementById('password-2').value;
    let Gender = document.querySelector('input[type="radio"]:checked').value;
    let Status = document.getElementById('status').value;
    let ListOfLoc = '';
    let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    for (var checkbox of markedCheckbox) {
        ListOfLoc += checkbox.value+" ";
        }
    let Address = document.getElementById('address').value;
    if((Name == '')){
        alert('Enter your Name');
        document.getElementById('name').focus();
        return ;
    }
    if((Phone == '')){
        alert('Enter your Number');
        document.getElementById('phone').focus();
        return ;
    }
   
    if((Email == '')){
        alert('Enter your gmail');
        document.getElementById('email').focus();
        return ;
    }
    
    if((Password == '')){
        alert('Enter your password');
        document.getElementById('password-1').focus();
        return ;
    }
    
    if((Password != CPassword)){
        alert('Your password does not Match! Retry');
        document.getElementById('password-2').focus();
        return ;

    }
    else {
        var numbers = /^[-+]?[0-9]+$/;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        
        if(!Phone.match(numbers))
        {
            alert('Enter in Valid Number format');
            document.getElementById('phone').focus();
            return ;
        }
        if(!Email.match(mailformat))
        {
            alert('Enter your mail id in the correct format');
            document.getElementById('email').focus();
            return ;
        }
        if((!Password.match(passw))){
            alert('Enter your password in the required Format : min of 8 characters, 1 Upper case, 1 Lower case, 1 special character, 1 number');
            document.getElementById('password-1').focus();
            return ;
        }
        let pastData = JSON.parse(localStorage.getItem("StudentInfo") || '[]');
        let UID = ("" + Math.random()).substring(2, 10);
        console.log(UID);
        //
        console.log(pastData)
        let tempObj = {"uid":UID,"name": Name,"phone": Phone,"email": Email,"password": Password,"cpassword": CPassword,"gender": Gender,"status": Status,"listofloc": ListOfLoc,"address": Address};
        // tempArray.push(tempObj);
        pastData.push(tempObj)
        localStorage.setItem("StudentInfo",JSON.stringify(pastData));
    }
}


function table(){
    let data =JSON.parse(localStorage.getItem("StudentInfo"));
    console.log(data)
    let tbldt = '';
    for (let i = 0; i < data.length; i++) {
        let j = i+1;
        tbldt += '<tr><td><input type="checkbox" id="check" name="check" value='+data[i].uid+'></td><td>'+j+'</td><td>'+data[i].name+'</td><td>'+data[i].phone+'</td><td>'+data[i].email+'</td><td>'+data[i].password+'</td><td>'+data[i].gender+'</td><td>'+data[i].status+'</td><td>'+data[i].listofloc+'</td><td>'+data[i].address+'</td><td ><button data-toggle="modal" data-target="#myModal" onclick=" editRow('+data[i].uid+')" class="E">Edit</button><button onclick="deleteRow('+data[i].uid+')" class="D">Delete</button></td></tr>'
    }
    // console.log('tbldt==>'+tbldt)
    document.getElementById('tabledata').innerHTML = tbldt;
    // document.getElementById("myCheckbox").addEventListener("change", function(event){
    //     if(this.checked){
    //         $("#allselectdelete").show();    
    //     }
    //     else{
    //         $("#allselectdelete").hide();
    //     }
        
    //   });
    
         
        
      
}

function deleteRow(id){
    let data =JSON.parse(localStorage.getItem("StudentInfo"));
    for (let i = 0; i < data.length; i++) {
        if(data[i].uid == id){
            data.splice(i,1);
            // console.log(i);
        }
        localStorage.setItem("StudentInfo",JSON.stringify(data));
    }
    window.location.reload();
    
}

function editRow(id){
    let data =JSON.parse(localStorage.getItem("StudentInfo"));
    for (let i = 0; i < data.length; i++) {
        if(data[i].uid == id){
            $("#name").val(data[i].name);
            $("#phone").val(data[i].phone);
            $("#email").val(data[i].email);
            $("#password-1").val(data[i].password);
            let gen =data[i].gender;
            $('#' +gen ).prop('checked',true);
            $("#status").val(data[i].status);
            $("#address").val(data[i].address);
            $("#save").attr("onclick","save("+id+")");
            let lvalue = data[i].listofloc.split(" ");
            for(let j = 0; j < lvalue.length; j++){
                $('#'+lvalue[j]).prop('checked',true);
            }
        }
    }
}

function save(id){
    let data = JSON.parse(localStorage.getItem("StudentInfo"));
    for (let i = 0; i < data.length; i++) {
        if(data[i].uid == id){
            data[i].name = document.getElementById('name').value;
            data[i].phone = document.getElementById('phone').value;
            data[i].email = document.getElementById('email').value;
            data[i].password = document.getElementById('password-1').value;
            data[i].gender= document.querySelector('input[type="radio"]:checked').value;
            data[i].status= document.getElementById('status').value;
            let ListOfLoc = '';
            let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
            for (var checkbox of markedCheckbox) {
                ListOfLoc += checkbox.value+" ";
                }
            data[i].listofloc = ListOfLoc;
            data[i].address = document.getElementById('address').value;
        }
    }
    localStorage.setItem("StudentInfo",JSON.stringify(data));
    alert("Data Saved Successfully");
}

function allselectdel(){
    let checkmarked =document.querySelectorAll('input[type="checkbox"]:checked');
    let localdata = [];
    for(var checkitem of checkmarked){
        localdata.push(checkitem.value)
    }
    let itemdata = JSON.parse(localStorage.getItem("StudentInfo"));
    for (let i = 0; i < localdata.length; i++) {
        for (let j= 0;j< itemdata.length;j++){
            if(localdata[i] == itemdata[j].uid){
                itemdata.splice(j,1);
            // console.log(i);
        }
    }
        localStorage.setItem("StudentInfo",JSON.stringify(itemdata));
    }
    window.location.reload();
}

function refresh(){
    window.location.reload();
}