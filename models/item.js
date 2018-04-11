
class Item {
    constructor(id, title, type, category, medium, userId, status, updatedAt='', createdAt='') {
        this.id = id;
        this.title = title;
        this.type = type;
        this.category = category;
        this.medium = medium;
        this.userId = userId;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static getFromRow(row) {
        let item = new Item();
        item.title = row.title;
        item.id = row.id;
        item.updatedAt = row.updated_at;
        item.createdAt = row.created_at;
        item.category = row.category;
        item.medium = row.medium;
        item.status = row.status;
        item.userId = row.user_id;
        item.type = row.type;
        return item;
    }
}

module.exports = {
    Item: Item
};
