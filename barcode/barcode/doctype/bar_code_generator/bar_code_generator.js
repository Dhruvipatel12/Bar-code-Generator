// Copyright (c) 2024, dhruvi and contributors
// For license information, please see license.txt

frappe.ui.form.on("Bar-code Generator", {
    get_serial_no(frm) {        
        frappe.call({
            method: "barcode.barcode.doctype.bar_code_generator.bar_code_generator.get_serial_no",
            args: {
                item_code: frm.doc.item_code,
                limit: frm.doc.number_of_barcode
            },
            callback: function (r) {
                var serialNumbers = r.message;
                frm.set_value("details", 0)
                serialNumbers.forEach(function (obj) {
                    var child_create = frm.add_child("details");
                    child_create.serial_no = obj['name'];
                    child_create.item_name = obj['item_name'];
                })
            },
        });
    },
    on_submit: function (frm) {
        frappe.call({
            method: "barcode.barcode.doctype.bar_code_generator.bar_code_generator.set_status",
            args: {
                nm: frm.doc.details
            }
        })
    },
    after_cancel: function (frm) {
        frappe.call({
            method: "barcode.barcode.doctype.bar_code_generator.bar_code_generator.set_status_untick",
            args: {
                nm: frm.doc.details
            }
        })
    }
});
