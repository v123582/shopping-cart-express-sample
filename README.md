# shopping-cart-express-sample

## 開發流程

### Phase #1: 商品展示

* Visitor 商品展示、瀏覽商品
	* Visitor 可以瀏覽商品 (Product)
* Admin 管理商品
	* 加入會員系統，進入後台必須檢查權限
	* 撰寫一個 rake 來建立假商品資料
	* 撰寫 seed 放預設的管理員資料

### Phase #2: 商品與購物車

* Visitor 商品與購物車	、瀏覽商品
	* 點選「加入購物車」按鈕時，可以把商品放入購物車
	* 可以調整購物車中的商品數量或移除商品
	* 可以瀏覽購物車內容，顯示有多少商品在購物車裡面

### Phase #3: 成立訂單

* Customer 成立訂單
	* Customer 可以結帳成立訂單 (Order)
	* 訂單欄位包括收件人資訊，並備份訂單成立時的金額明細
	* 訂單成立後，Customer 會收到系統寄發的 e-mail 通知
	* 可以瀏覽訂單紀錄
	* 可以取消尚未出貨的訂單
* Admin 管理商品、管理訂單
	* Admin 可以看到訂單一覽
	* Admin 可以修改訂單出貨/訂單金流狀態

## 資料結構

- Product
- Cart
- CartItem
- Order
- OrderItem
- Payment
- User

## Wireframe / View

- 所有商品頁
- 單一商品頁
- 購物車頁
- 訂單成立頁
- 所有定單頁
- 管理商品頁
- 新增商品頁
- 修改商品頁
- 管理訂單頁
- 修改訂單頁

## Implement: phase1

1. 成立專案

```
$ git init
$ npm init
$ touch .gitignore
```

2. 初始化專案

```
$ express --view=hbs .
```

3. 定義資料表

- Product
- Cart
- CartItem
- Order
- OrderItem
- Payment
- User

```
$ sequelize init
$ sequelize model:create --name Product --attributes name:string,description:text,price:integer,image:string
$ sequelize model:create --name Cart --attributes quantity:integer
$ sequelize model:create --name CartItem --attributes CartId:integer,ProductId:integer,quantity:integer
$ sequelize model:create --name Order --attributes name:string,phone:string,address:string,amount:integer,sn:integer,shipping_status:string,payment_status:string,UserId:integer
$ sequelize model:create --name OrderItem --attributes OrderId:integer,ProductId:integer,price:integer,quantity:integer
$ sequelize model:create --name Payment --attributes amount:integer,sn:integer,payment_method:string,paid_at:date,params:text,OrderId:integer
$ sequelize model:create --name User --attributes email:string,password:string,role:string
$ sequelize db:migrate
```

4. 定義 Model 間關係

5. 生成測試假資料

```
$ sequelize seed:create --name products-seed-file
$ sequelize seed:create --name carts-seed-file
$ sequelize seed:create --name cartItems-seed-file
$ sequelize seed:create --name orders-seed-file
$ sequelize seed:create --name orderItems-seed-file
$ sequelize seed:create --name payments-seed-file
$ sequelize db:seed:all
```

6. 實作商品與購物車路由: GET products & GET cart
	* Visitor 可以瀏覽商品 (GET Products)
	* 可以瀏覽購物車內容，顯示有多少商品在購物車裡面 (GET Cart View)

7. 實作購物車操作: POST cart
	* Visitor 可以新增商品到購物車（POST /cart）

8. 實作購物車操作: POST cartItem/add、cartItem/sub、DELETE /cartItem
	* Visitor 可以調整購物車內商品數量（POST /cartItem/:id/add、/cartItem/:id/sub）
	* Visitor 可以刪除購物車內商品（DELETE /cartItem/:id）

9. 實作訂單路由: GET orders
	* 可以瀏覽訂單紀錄（GET orders）

11. 實作訂單操作: Post order、POST order/cancel
	* Customer 可以結帳成立訂單 (POST order)
	* 可以取消尚未出貨的訂單（POST order/:id/cancel）

10. 實作訂單成立通知信
	* 訂單成立後，Customer 會收到系統寄發的 e-mail 通知

## Implement: phase2

1. 準備付款頁面
	* /order/:id/payment
	* /spgateway/callback