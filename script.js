const actBtn=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const closeBtn=document.querySelector('#cart-close');

actBtn.addEventListener('click',()=>{
    cart.classList.add('cart-active');
});

closeBtn.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadShop);

function loadShop(){
    loadContent();
}
function loadContent(){
    let btnRemove=document.querySelectorAll('#cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });

    /*quantity*/

    let quantityItem=document.querySelectorAll('.quantity');
    quantityItem.forEach((input)=>{
        input.addEventListener('change',quantityFun);
    });

    //addcart

    let cartBtn=document.querySelectorAll('#icon');
    cartBtn.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });
    totalValue();
}
function removeItem(){
    if(confirm("remove item")){
    let title=this.parentElement.querySelector('.cart-box-title').innerHTML;
    itemList=itemList.filter(elt=>elt.title!=title);
    //console.log(title);
    this.parentElement.remove();
    loadContent();}
};

/*quantity increase*/
function quantityFun(){
    if(isNaN(this.value)||this.value<1){
        this.value=1;
    };
    loadContent();
    //
};
//addcart
let itemList=[];
function addCart(){
    let allItem=this.parentElement;
    let title=allItem.querySelector('.img-title').innerHTML;
    let price=allItem.querySelector('.price').innerHTML;
    let imgSrc=allItem.querySelector('.image-box').src;
    //console.log(title,price,imgSrc);


    //step

    let newProduct={title,price,imgSrc}
    if(itemList.find((a)=>a.title==newProduct.title)){
        alert("item already added")
        return;
    }
    else{
        itemList.push(newProduct);
    }

    //step
    let newElt=createCart(title,price,imgSrc);
    let elt=document.createElement('div');
    elt.innerHTML=newElt;
    let cartAdd=document.querySelector('.cart-content');
    cartAdd.append(elt);
    loadContent();
}

function createCart(title,price,imgSrc){
    return `
    <div class="cart-box">
    <img src="${imgSrc}" alt="" class="cart-image"/>
<div class="img-details">
    <div class="cart-box-title">${title}</div>
    <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amount">${price}</div>
    </div>
    <input type="number" value="1" class="quantity"/>

</div>
<i class="fa-solid fa-trash" id="cart-remove"></i>
</div>
    `;
}
function totalValue(){
    const cartItem=document.querySelectorAll('.cart-box');
    const totalItem=document.querySelector('.total-price');

    let total=0;
    cartItem.forEach(elt=>{
        let cartPrice=elt.querySelector('.cart-price');
        let priceElement=parseInt(cartPrice.innerHTML.replace("Rs.",""));
        let quty=elt.querySelector('.quantity').value;
        total+=(priceElement*quty);
        elt.querySelector('.cart-amount').innerText="Rs."+(priceElement*quty);

    });
    totalItem.innerHTML="Rs."+total;

    //countcart

    const count=document.querySelector('.cart-count');
    let countLen=itemList.length
    count.innerHTML=countLen;
    const buynow=document.querySelector('.btn');
    buynow.addEventListener('click',ordered);
    loadContent();
}
function ordered(){
    alert("your item has been successfully ordered");
}
