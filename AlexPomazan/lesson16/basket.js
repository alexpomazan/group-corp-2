class BasketOfGoods {
    constructor(address, comment) {
        this.items = [];
        this.setAddress(address);
        this.setComment(comment);
    }

    setAddress(address) {
        this._address = address;
    }

    setComment(comment) {
        this._comment = comment;
    }

    async getBasketOfGoods() {
        const response = await fetch('/basket');
        this.items = await response.json();
    }

    async postBasketOfGoods(product) {
        const data = await fetch('/basket', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-type': 'application/json',
            },
        });
    }

    async patchBasketOfGoods(product, quantity) {
        const data = await fetch(`/basket/${product.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                quantity: quantity
            }),
            headers: {
                'Content-type': 'application/json',
            },
        });
    }

    async deleteBasketOfGoods(product) {
        const data = await fetch(`/basket/${product.id}`, {
            method: 'DELETE',
        });
    }

    countBasketPrice() {
        let amout = 0;
        for (let product in this.items) {
            amout += this.items[product].price * this.items[product].quantity;
        }
        return amout;
    }

    renderBasket() {
        let infoBasket;
        let numberOfGoods = 0;
        if (!this.items.length) {
            infoBasket = "Корзина пуста.";
            acceptBasket.style.display = "none";

        } else {
            acceptBasket.style.display = "inline-block";
            for (let product in this.items) {
                let quantity = this.items[product].quantity;
                numberOfGoods += quantity;
            }
            infoBasket =
                "В корзине " +
                numberOfGoods +
                " товаров на сумму " +
                this.countBasketPrice() +
                " рублей.";
        }
        return (infoBasketMessage.textContent = infoBasket);
    }
    //Отображение формы и кнопок
    appendOrderForm() {
        const form = document.createElement("form");
        basketCard.append(form);

        const nextBasket = document.createElement("button");
        nextBasket.textContent = "Далее";
        nextBasket.className = "btn next-basket btn-info";
        basketCard.append(nextBasket);

        const completeBasket = document.createElement("button");
        completeBasket.textContent = "Завершить заказ";
        completeBasket.className = "btn complete-basket btn-warning";
        basketCard.append(completeBasket);
    }

    //Заполнение адресса и скрытие ненужных блоков
    showAddress() {
        let form = document.querySelector("form");
        const addressDiv = document.createElement("div");
        addressDiv.classList.add("address-div");
        form.appendChild(addressDiv);

        const labelForAddress = document.createElement("label");
        labelForAddress.className = "label-address";
        labelForAddress.setAttribute("for", "address");
        labelForAddress.textContent = "Введите адрес доставки:";
        addressDiv.appendChild(labelForAddress);

        const address = document.createElement("input");
        address.setAttribute("name", "address");
        address.setAttribute("id", "address");
        address.setAttribute("type", "text");
        address.setAttribute("placeholder", "Ваш адрес");
        address.setAttribute("minlength", "10");
        address.classList.add("address-input");
        addressDiv.appendChild(address);

        let completeBtn = document.querySelector(".complete-basket ");

        completeBtn.style.display = "none";
        addressDiv.style.display = "flex";
    }

    //Заполнение коммента и скрытие ненужных блоков
    showComment() {
        let form = document.querySelector("form");
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-div");
        form.appendChild(commentDiv);

        const labelForComment = document.createElement("label");
        labelForComment.setAttribute("for", "comment");
        labelForComment.textContent = "Оставьте комментарий к заказу:";
        commentDiv.appendChild(labelForComment);

        const comment = document.createElement("textarea");
        comment.className = "comment-textarea";
        comment.setAttribute("name", "comment");
        comment.setAttribute("id", "comment");
        comment.setAttribute("placeholder", "Ваш комментарий...");
        commentDiv.appendChild(comment);

        let addDiv = document.querySelector(".address-div");
        let nextBtn = document.querySelector(".next-basket");
        let submitBtn = document.querySelector(".complete-basket");

        nextBtn.style.display = "none";
        addDiv.style.display = "none";
        commentDiv.style.display = "flex";
        submitBtn.style.display = "inline-block";
    }

    //Отображение оформления заказа при нажатии кнопки
    showComplitionBasket() {
        acceptBasket.onclick = function () {
            const feedback = document.querySelector('.feedback');
            feedback.style.display = 'none';
            acceptBasket.style.display = "none";
            headingBasket.style.display = "none";
            order.style.display = "block";
            infoBasketMessage.style.display = "none";
            const btnsAdd = document.querySelectorAll(".btn-add");
            const btnsDelete = document.querySelectorAll(".btn-delete");
            btnsDelete.forEach((btn, i) => {
                btn.setAttribute("disabled", true);
            });
            btnsAdd.forEach((btn, i) => {
                btn.setAttribute("disabled", true);
            });
            basket.appendOrderForm();
            basket.showAddress();
            let next = document.querySelector(".next-basket");
            next.onclick = function () {
                let inputAddress = document.querySelector(".address-input");
                if (inputAddress.value.length > 8) {
                    basket.setAddress(inputAddress.value);
                    basket.showComment();
                } else {
                    alert("Введите адрес доставки!");
                }
            };
            let complete = document.querySelector(".complete-basket");
            complete.onclick = function () {
                feedback.style.display = 'block';
                let commentDiv = document.querySelector(".comment-div");
                infoBasketMessage.style.display = "block";
                commentDiv.style.display = "none";
                complete.style.display = "none";

                let textareaСomment = document.querySelector(".comment-textarea");
                basket.setComment(textareaСomment.value);
                let addressBasket = document.createElement("div");
                addressBasket.className = "address";
                addressBasket.textContent = `Адресс доставки: ${basket._address}`;
                basketCard.append(addressBasket);
                let commentBasket = document.createElement("div");
                commentBasket.className = "comment";
                if (textareaСomment.value.length > 0) {
                    commentBasket.textContent = `Комментарий: ${basket._comment}`;
                } else {
                    commentBasket.textContent = "Комментарий: Комментария нет";
                }
                basketCard.append(commentBasket);
            };
        };
    }
}