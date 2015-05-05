/*global Ext, PM*/

Ext.ns('PM');
PM.ImagesPanel = Ext.extend(Ext.DataView, {
    autoScroll: true,
    itemSelector: '.image',
    initComponent: function () {
        this.createStore();
        this.createTemplate();
        this.initDD();
        PM.ImagesPanel.superclass.initComponent.call(this);
    },
    createStore: function () {
        this.store = {
            xtype: 'jsonstore',
            fields: ['id', 'url', 'width', 'height']
        };
    },
    createTemplate: function () {
        this.tpl = [
            '<tpl for=".">',
                '<div class="image">',
                    '<img src="{url}" width="{width}" height="{height}" alt="" />',
                '</div>',
            '</tpl>'
        ].join('');
    },
    initDD: function () {
        if (!this.plugins) {
            this.plugins = [];
        }
        this.plugins.push('sortableDataView');
        this.dragSelector = 'img';
    },
    removeAllImages: function () {
        this.getStore().removeAll();
        return this;
    },
    addImages: function (images) {
        var records = [];
        Ext.each(images, function (image) {
            records.push(new Ext.data.Record(image));
        });
        this.getStore().add(records);
        return this;
    },
    getIds: function () {
        var result = [];
        this.getStore().each(function (record) {
            result.push(record.get('id'));
        });
        return result;
    }
});
Ext.reg('imagesPanel', PM.ImagesPanel);