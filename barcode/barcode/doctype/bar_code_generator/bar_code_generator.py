# Copyright (c) 2024, dhruvi and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class BarcodeGenerator(Document):
	pass
@frappe.whitelist()
def get_serial_no(item_code, limit):
    data = frappe.db.sql("SELECT name FROM `tabSerial No` WHERE item_code = %s and custom_barcode_generator=0 ORDER BY name ASC", item_code, as_dict=True)
    serial_no = []
    if data:
        for row in range(int(limit)):
            serial_no.append(data[row]['name'])
            frappe.db.set_value("Serial No",data[row]['name'],"custom_barcode_generator",1)
    return serial_no


	
	