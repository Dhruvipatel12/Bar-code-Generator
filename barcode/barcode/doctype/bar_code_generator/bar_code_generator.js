// Copyright (c) 2024, dhruvi and contributors
// For license information, please see license.txt

frappe.ui.form.on("Bar-code Generator", {
    get_serial_no(frm) {
        // frm.add_custom_button(__("Get Log Sheet"), function () {
            frappe.call({
                method: "barcode.barcode.doctype.bar_code_generator.bar_code_generator.get_serial_no",
                args: {
                    item_code: frm.doc.item_code,
                    limit:frm.doc.number_of_barcode
                },
                callback: function (r) {
                    var serialNumbers = r.message;
                    console.log(serialNumbers);
                    if (serialNumbers && serialNumbers.length > 0) {
                        for (var i = 0; i < serialNumbers.length; i++) {
                            var child_create = frm.add_child("details");
                            child_create.serial_no = serialNumbers[i]; // Use index i instead of 0
                            child_create.item_code = frm.doc.item_code;
                            
                        }
                        refresh_field("details"); // Refresh the child table field after adding rows
                    } else {
                        // Handle case where no serial numbers were returned
                    }
                },
            });
        // });
        
	},
});
