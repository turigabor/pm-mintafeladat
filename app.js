/*global Ext*/

Ext.onReady(function () {
    var win = new Ext.Window({
        title: 'Képkereső + sorbarendező mintafeladat',
        bodyStyle: 'background-color: white',
        closable: false,
        layout: 'border',
        width: 680,
        height: 400,
        items: [{
            xtype: 'searchPanel',
            region: 'north',
            autoHeight: true,
            listeners: {
                beforeload: function () {
                    win.getEl().mask('Betöltés folyamatban...');
                },
                load: function (cmp, images) {
                    var imagesPanel = cmp.nextSibling();
                    imagesPanel.removeAllImages().addImages(images);
                    win.getEl().unmask();
                    // azért, hogy frissüljön betöltéskor a lábléc:
                    imagesPanel.fireEvent('serialise', imagesPanel);
                }
            }
        }, {
            xtype: 'imagesPanel',
            region: 'center',
            listeners: {
                serialise: function (cmp) {
                    var ids = cmp.getIds();
                    var text = ids.length ? 'Kép azonosítók: ' + ids.join(', ') : '';
                    cmp.nextSibling().getEl().update(text);
                }
            }
        }, {
            xtype: 'box',
            height: 35,
            style: 'padding: 3px',
            region: 'south'
        }]
    });
    win.show();
});