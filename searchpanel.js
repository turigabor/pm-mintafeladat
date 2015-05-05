/*global Ext, PM*/

Ext.ns('PM');
PM.SearchPanel = Ext.extend(Ext.Container, {
    layout: 'table',
    style: 'padding: 5px',
    initComponent: function () {
        this.createItems();
        PM.SearchPanel.superclass.initComponent.call(this);
        this.addEvents('beforeload', 'load');
        this.btn.on('click', this.loadImages, this);
    },
    createItems: function () {
        this.items = [{
            xtype: 'textfield',
            value: 'coffee',
            ref: 'field'
        }, {
            xtype: 'button',
            text: 'Kép keresés',
            style: 'margin-left: 5px',
            ref: 'btn'
        }];
    },
    loadImages: function () {
        if (this.fireEvent('beforeload', this, this.field.getValue()) === false) {
            return;
        }
        Ext.Ajax.request({
            url: 'images.php',
            params: {
                q: this.field.getValue()
            },
            scope: this,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                this.fireEvent('load', this, result);
            }
        });
    }
});
Ext.reg('searchPanel', PM.SearchPanel);