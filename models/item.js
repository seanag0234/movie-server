
class Item {
    constructor(title, type, category, medium, userId, status, updatedAt='', createdAt='') {
        this.title = title;
        this.type = type;
        this.category = category;
        this.medium = medium;
        this.userId = userId;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = {
    Item: Item
};
