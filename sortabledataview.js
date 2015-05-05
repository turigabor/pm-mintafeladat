/*global Ext*/

// eredeti megoldás: http://tof2k.com/ext/sortable/
Ext.namespace('Ext.ux.plugins');
Ext.ux.plugins.SortableDataView = {
    init: function (view) {
        view.on('render', function () {
            view.addEvents('serialise');
            Ext.apply(new Ext.dd.DragDrop(view.el), {
                // itt indul a folyamat, megkeressük, hogy melyik rekordon nyomtuk le az egeret:
                onMouseDown: function (e) {
                    this.dragData = null;
                    try {
                        // ha van mozgatáshoz tartozó selector, de nem azon állunk:
                        if (view.dragSelector && !e.getTarget(view.dragSelector)) {
                            return;
                        }
                        var id = view.indexOf(e.getTarget(view.itemSelector));
                        if (id !== -1) {
                            this.dragData = {orig: id, last: id, record: view.store.getAt(id)};
                        }
                    } catch (error) {}
                },
                // mozgatás kezdete, a kiválasztott elemhez (ha van) hozzáadjuk a megfelelő osztályt
                startDrag: function () {
                    if (!this.dragData) {
                        return;
                    }
                    Ext.fly(view.getNode(this.dragData.orig)).addClass(view.dragCls);
                },
                // a lényegi rész, lekérjük, hogy melyik elem felett vagyunk, és a kiválasztott elemet annak a helyére szúrjuk
                onDrag: function (e) {
                    if (!this.dragData) {
                        return;
                    }
                    try {
                        var id = view.indexOf(e.getTarget(view.itemSelector));
                        if (id !== -1 && id !== this.dragData.last) {
                            this.dragData.last = id;
                            view.store.remove(this.dragData.record);
                            view.store.insert(id, [this.dragData.record]);
                            Ext.fly(view.getNode(id)).addClass(view.dragCls);
                        }
                    } catch (error) {}
                },
                // folyamat vége, a dragCls-t leszedjük a kiválasztott elemről, továbbá az esemény elküldése
                endDrag: function () {
                    if (!this.dragData) {
                        return;
                    }
                    Ext.fly(view.getNode(this.dragData.last)).removeClass(view.dragCls);
                    if (this.dragData.orig !== this.dragData.last) {
                        view.fireEvent('serialise', view, this.dragData.orig, this.dragData.last);
                    }
                }
            });
        });
    }
};
Ext.preg('sortableDataView', Ext.ux.plugins.SortableDataView);