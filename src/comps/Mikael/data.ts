import {Aggregation, UMLClass} from "./classes";
import {MARGIN} from "./const";
import {createLabels} from "./getPackagePort";

const sourceData = {
    "data": {
        "objects": [
            {
                "id": 1,
                "memo": "country",
                "name": "Country",
                "group_id": 1,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 2,
                "memo": "region",
                "name": "Region",
                "group_id": 1,
                "is_dealer": false,
                "master_id": 1,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 3,
                "memo": "locality",
                "name": "City",
                "group_id": 1,
                "is_dealer": false,
                "master_id": 2,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 5,
                "memo": "street",
                "name": "Street",
                "group_id": 1,
                "is_dealer": false,
                "master_id": 3,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 6,
                "memo": "building",
                "name": "Building",
                "group_id": 1,
                "is_dealer": false,
                "master_id": 5,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 7,
                "memo": "radius_server",
                "name": "Radius",
                "group_id": 2,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 8,
                "memo": "ip_network",
                "name": "IP network",
                "group_id": 2,
                "is_dealer": false,
                "master_id": 7,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 9,
                "memo": "flash_system",
                "name": "Terminal flash system",
                "group_id": 2,
                "is_dealer": false,
                "master_id": 8,
                "with_memo": false,
            },
            {
                "id": 10,
                "memo": "terminal_domain",
                "name": "Domain",
                "group_id": 3,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 11,
                "memo": "terminal_group",
                "name": "Terminal group",
                "group_id": 3,
                "is_dealer": false,
                "master_id": 10,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 12,
                "memo": "terminal",
                "name": "Terminal",
                "group_id": 3,
                "is_dealer": false,
                "master_id": 11,
                "with_memo": false,
                "parameters": [{
                    "id": 34,
                    "memo": "TERMINAL_HOME_PAGE",
                    "name": "Terminal's home page",
                    "data_type": "varchar",
                    "default_value": null
                },
                    {
                        "id": 41, "memo": "TERMINAL_ACQUIRING_MEMO", "name": "Memo internet acquiring", "data_type": "varchar", "default_value": null
                    }, {"id": 67, "memo": "TERMINAL_SECOND_PAGE", "name": "Terminal's second page", "data_type": "varchar", "default_value": null}, {
                        "id": 68,
                        "memo": "CASHDESK_NO_GOODS",
                        "name": "«‡ÔÂÚËÚ¸ ÔÓ‰‡ÊÛ ÚÓ‚‡Ó‚ ˜ÂÂÁ ‰‡ÌÌÛ˛ Í‡ÒÒÛ",
                        "data_type": "bool",
                        "default_value": null
                    }, {"id": 73, "memo": "TERMINAL_ENABLE_DOUBLE_BILL", "name": "Enable double bill", "data_type": "bool", "default_value": null}],
                "with_image": false
            },
            {
                "id": 13,
                "memo": "dealer_group",
                "name": "Dealer Group",
                "group_id": 4,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 14,
                "memo": "dealer",
                "name": "Dealer",
                "group_id": 4,
                "is_dealer": true,
                "master_id": 13,
                "with_memo": false,
                "parameters": [{"id": 4, "memo": "DEALER_VAR_SYMBOL", "name": "Var.symbol", "data_type": "varchar", "default_value": null}, {
                    "id": 5, "memo": "DEALER_CREDIT_LIMIT"
                    , "name": "Dealer's credit limit", "data_type": "int4", "default_value": null
                }, {
                    "id": 6,
                    "memo": "DEALER_IS_TOUR_OPERATOR",
                    "name": "Allow dealer to be a tour operator",
                    "data_type": "bool",
                    "default_value": null
                }, {
                    "id": 10,
                    "memo": "DEALER_TELEGRAM_CHAT_ID", "name": "Telegram chat ID", "data_type": "bool", "default_value": null
                }, {"id": 44, "memo": "DEALER_TIMEZONE", "name": "Dealer's timezone", "data_type": "varchar", "default_value": null}, {
                    "id": 64, "memo": "DEALER_DIC_POPLATINIKA", "name": "DIC poplatnika", "data_type": "varchar", "default_value": null
                }, {
                    "id": 65, "memo": "DEALER_DEFAULT_CURRENCY_ID", "name": "Dealer's default currency id", "data_type": "int4", "default_value": null
                }, {"id": 66, "memo": "DEALER_VAT_PRC", "name": "Vat prc", "data_type": "int4", "default_value": null}, {
                    "id": 77, "memo": "DEFAULT_TIMEZONE", "name": "Default timezone", "data_type": "varchar", "default_value": null
                }],
                "with_image": false
            },
            {
                "id": 15,
                "memo": "currency",
                "name": "Currency",
                "group_id": 5,
                "is_dealer": false,
                "master_id": null,
                "with_memo": true,
                "parameters": [{
                    "id": 29, "memo": "CURRENCY_SHORT_NAME", "name": " ÓÓÚÍÓÂ Ì‡ËÏÂÌÓ‚‡ÌËÂ ‚‡Î˛Ú˚", "data_type": "varchar", "default_value": null
                }, {"id": 33, "memo": "CURRENCY_ISO_4217", "name": "ISO 4217 code", "data_type": "varchar", "default_value": null}, {
                    "id": 62, "memo": "CURRENCY_CSS_CLASS", "name": "CSS Class", "data_type": "varchar", "default_value": null
                }, {"id": 63, "memo": "CURRENCY_FIRST_LAYOUT", "name": "—ËÏ‚ÓÎ ‚Ì‡˜‡ÎÂ", "data_type": "bool", "default_value": null}],
                "with_image": false
            }, {
                "id": 16,
                "memo": "provider",
                "name": "Provider",
                "group_id": 4,
                "is_dealer": false,
                "master_id": null,
                "with_memo": true,
                "parameters": [{
                    "id": 9, "memo": "DEFAULT_LANGUAGE", "name": "Default language", "data_type": "varchar", "default_value": null
                }],
                "with_image": false
            },
            {
                "id": 17,
                "memo": "operator",
                "name": "Operator",
                "group_id": 4,
                "is_dealer": false,
                "master_id": 16,
                "with_memo": true,
                "parameters": [{
                    "id": 11, "memo": "USE_SLOTS", "name": "Booking serviceswith  slots", "data_type": "bool", "default_value": null
                }, {"id": 12, "memo": "SLOT_COUNT", "name": "Default slot count", "data_type": "int4", "default_value": null}, {
                    "id": 20,
                    "memo": "CAN_CHANGE_SLOT_COUNT",
                    "name": "Can change slot count",
                    "data_type": "bool",
                    "default_value": null
                }, {"id": 13, "memo": "AGE_POLICY_ID", "name": "Default age policy id", "data_type": "int4", "default_value": null}, {
                    "id": 21,
                    "memo": "CAN_CHANGE_AGE_POLICY_ID",
                    "name": "Can change age policy id",
                    "data_type": "bool",
                    "default_value": null
                }, {"id": 23, "memo": "DEFAULT_MAX_AGE", "name": "Default age parameter", "data_type": "int4", "default_value": null}, {
                    "id": 24,
                    "memo": "USE_ONLY_DEFAULT_AGE_PARAMETER",
                    "name": "Use only default age parameter",
                    "data_type": "bool",
                    "default_value": null
                }, {"id": 14, "memo": "SLOT_PERSON_CAPACITY", "name": "Slot person capacity", "data_type": "int4[]", "default_value": null},
                    {
                        "id": 22,
                        "memo": "CAN_CHANGE_SLOT_PERSON_CAPACITY",
                        "name": "Can change slot person capacity",
                        "data_type": "bool",
                        "default_value": null
                    }, {
                        "id": 15, "memo": "TARIFF_ID", "name": "Default tariff id", "data_type": "int4", "default_value": null
                    }, {
                        "id": 16,
                        "memo": "SERVICE_DURATION",
                        "name": "Default service duration",
                        "data_type": "interval",
                        "default_value": null
                    }, {
                        "id": 17,
                        "memo": "INTERSERVICE_DURATION",
                        "name": "Default interservice duration",
                        "data_type": "interval",
                        "default_value": null
                    }, {"id": 18, "memo": "WORK_BTIME", "name": "Work begin time", "data_type": "time", "default_value": null}, {
                        "id": 19, "memo": "WORK_ETIME", "name": "Work end time", "data_type": "time", "default_value": null
                    }, {"id": 25, "memo": "DEFAULT_CURRENCY_ID", "name": "Default currency id", "data_type": "int4", "default_value": null}, {
                        "id": 26,
                        "memo": "CAN_CHANGE_DEFAULT_CURRENCY",
                        "name": "ÃÓÊÌÓ ËÒÔÓÎ¸ÁÓ‚‡Ú¸ ‰Û„ËÂ ‚‡Î˛Ú˚",
                        "data_type": "bool",
                        "default_value": null
                    }, {
                        "id": 27,
                        "memo": "ENABLE_ADDITIONAL_SERVICES",
                        "name": "Enable additional services",
                        "data_type": "bool",
                        "default_value": null
                    }, {
                        "id": 28,
                        "memo": "SLOT_GENERATION_PERIOD",
                        "name": "Default slot future generation period",
                        "data_type": "interval",
                        "default_value": null
                    }],
                "with_image": false
            }, {
                "id": 18,
                "memo": "service",
                "name": "Service",
                "group_id": 4,
                "is_dealer": false,
                "master_id": 17,
                "with_memo": true,
                "parameters": [{
                    "id": 1,
                    "memo": "SRV_VAR_SYMBOL",
                    "name": "Variable symbol",
                    "data_type": "varchar",
                    "default_value": null
                }, {"id": 2, "memo": "SRV_CONST_SYMBOL", "name": "Constantni symbol", "data_type": "varchar", "default_value": null}, {
                    "id": 69,
                    "memo": "SERVICE_EXT_CHECK_FUNCTION",
                    "name": "External check function name",
                    "data_type": "varchar",
                    "default_value": null
                }, {
                    "id": 70, "memo": "SERVICE_EXT_COMMIT_FUNCTION", "name": "External commit function", "data_type": "varchar", "default_value": null
                }, {
                    "id": 71,
                    "memo": "SERVICE_EXT_CHECK_SERVICE",
                    "name": "Use external check service",
                    "data_type": "bool",
                    "default_value": null
                }, {
                    "id": 72,
                    "memo": "SERVICE_EXT_COMMIT_SERVICE", "name": "Use external commit service", "data_type": "bool", "default_value": null
                }, {
                    "id": 3, "memo": "SERVICE_PROCESSING_FUNCTION", "name": "Processing function", "data_type": "varchar",
                    "default_value": null
                }],
                "with_image": false
            },
            {
                "id": 19,
                "memo": "bank",
                "name": "Bank",
                "group_id": 5,
                "is_dealer": false,
                "master_id": null,
                "with_memo": true,
                "parameters": null,
                "with_image": false
            }, {
                "id": 20,
                "memo": "contractor",
                "name": "Contractor",
                "group_id": 5,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 21,
                "memo": "account",
                "name": "Account",
                "group_id": 5,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 22,
                "memo": "tariff",
                "name": "Tariff",
                "group_id": 4,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            },
            {
                "id": 23,
                "memo": "service_booking_category",
                "name": "Service booking category",
                "group_id": 6,
                "is_dealer": false,
                "master_id": null,
                "with_memo": true,
                "parameters": [{
                    "id": 61, "memo": "CATEGORY_DEFAULT_ORDER", "name": "Category default order", "data_type": "varchar", "default_value": null
                }],
                "with_image": false
            }, {
                "id": 24,
                "memo": "service_booking_type",
                "name": "Service booking types",
                "group_id": 6,
                "is_dealer": false,
                "master_id": 23,
                "with_memo": true,
                "parameters": [{
                    "id": 32,
                    "memo": "SERVICE_BOOKING_TYPE_FULL_INTERVAL_BOOKING",
                    "name": "Booking for full days interval (cars rent, rooms)",
                    "data_type": "bool",
                    "default_value": null
                }],
                "with_image": false
            },
            {
                "id": 25,
                "memo": "service_booking_class",
                "name": "Service booking classes",
                "group_id": 6,
                "is_dealer": false,
                "master_id": 24,
                "with_memo": true,
                "parameters": [{
                    "id": 7,
                    "memo": "SERVICE_BOOKING_MIN_DURATION",
                    "name": "Service min duration",
                    "data_type": "interval",
                    "default_value": null
                }, {"id": 8, "memo": "SERVICE_BOOKING_MAX_DURATION", "name": "Service max duration", "data_type": "interval", "default_value": null}],
                "with_image": false
            }, {
                "id": 26,
                "memo": "service_template",
                "name": "Service template",
                "group_id": 4,
                "is_dealer": false,
                "master_id": 16,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 27, "memo": "language",
                "name": "Language", "group_id": 7, "is_dealer": false, "master_id": null, "with_memo": true, "parameters": [{
                    "id": 42, "memo": "LANGUAGE_FULL_TEXT_MEMO", "name": "Language full text memo", "data_type": "varchar", "default_value": null
                }], "with_image": false
            }, {
                "id": 28,
                "memo": "service_booking_age_policy",
                "name": "Service  booking age policy",
                "group_id": 6,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 29,
                "memo": "booking_policy",
                "name": "Booking policy",
                "group_id": 6,
                "is_dealer": false,
                "master_id": 28,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 30, "memo": "showplace", "name":
                    "Showplace", "group_id": 1, "is_dealer": false, "master_id": 2, "with_memo": false, "parameters": null, "with_image": false
            }, {
                "id": 31,
                "memo": "sale_point",
                "name": "Sale point",
                "group_id": 4,
                "is_dealer": false,
                "master_id": 16,
                "with_memo": true,
                "parameters": null,
                "with_image": false
            }, {
                "id": 32,
                "memo": "cms_content_tree",
                "name": "CMS content tree",
                "group_id": 8,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": [{
                    "id": 43, "memo": "CMS_TREE_CONTENT_ORDER", "name": "Content order", "data_type": "varchar", "default_value": null
                }],
                "with_image": false
            }, {
                "id": 33,
                "memo": "cms_content",
                "name": "CMS content",
                "group_id": 8,
                "is_dealer": false,
                "master_id": null,
                "with_memo": true,
                "parameters": null,
                "with_image": false
            }, {
                "id": 34,
                "memo": "voucher",
                "name": "Voucher",
                "group_id": 4,
                "is_dealer": false,
                "master_id": 17,
                "with_memo": false,
                "parameters": [{
                    "id": 30
                    , "memo": "VOUCHER_ORIENTATION", "name": "Orientation", "data_type": "varchar", "default_value": "Landscape"
                }, {
                    "id": 31,
                    "memo": "VOUCHER_PASTE_TOGETHER",
                    "name": "Paste multiple vouchers together",
                    "data_type": "bool",
                    "default_value": "True"
                }],
                "with_image": false
            }, {
                "id": 35,
                "memo": "pinpad",
                "name": "PIN pad",
                "group_id": 3,
                "is_dealer": false,
                "master_id": 12,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 36,
                "memo": "booking_condition",
                "name": "Booking condition",
                "group_id": 4,
                "is_dealer": false,
                "master_id": 16,
                "with_memo": false,
                "parameters": [{"id": 79, "memo": "TEST", "name": "TEST", "data_type": "objects", "default_value": null}],
                "with_image": false
            }, {
                "id": 37,
                "memo": "booking_option",
                "name": "Booking option",
                "group_id": 6,
                "is_dealer": false,
                "master_id": 24,
                "with_memo": true,
                "parameters": null,
                "with_image": false
            }, {
                "id": 38,
                "memo": "service_booking_sub_class",
                "name": "Service booking sub- classes",
                "group_id": 6,
                "is_dealer": false,
                "master_id": 25,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 39,
                "memo": "terminal_config",
                "name": "Terminalconfig",
                "group_id": 3,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": [{
                    "id": 60,
                    "memo": "TERMINAL_CONFIG_HOME_PAGE",
                    "name": "Default terminal home page",
                    "data_type": "varchar",
                    "default_value": null
                }],
                "with_image": false
            }, {
                "id": 40,
                "memo": "terminal_custom_config",
                "name": "Terminal custom config",
                "group_id": 3,
                "is_dealer": false,
                "master_id": 39,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id":
                    41,
                "memo": "service_booking_tag",
                "name": "Service booking tag",
                "group_id": 6,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 42,
                "memo": "acquiring",
                "name": "›Í‚‡ÈËÌ„",
                "group_id": 5,
                "is_dealer": false,
                "master_id": null,
                "with_memo": true,
                "parameters": [{"id": 35, "memo": "ACQUIRING_CAPTION", "name": "Caption", "data_type": "varchar", "default_value": null}, {
                    "id": 36, "memo": "ACQUIRING_URL", "name": "URL", "data_type": "varchar", "default_value": null
                }],
                "with_image": false
            }, {
                "id": 43, "memo": "cms_button", "name": "CMS button", "group_id": 8, "is_dealer": false, "master_id": null, "with_memo": false,
                "parameters": [{
                    "id": 37,
                    "memo": "CMS_BUTTON_HTTP_LINK",
                    "name": "Button http link",
                    "data_type": "varchar",
                    "default_value": null
                }, {
                    "id": 39, "memo": "CMS_BUTTON_OBJECT_ID", "name": "Button object id", "data_type": "varchar", "default_value": null
                }, {"id": 40, "memo": "CMS_BUTTON_MEMO", "name": "Button memo", "data_type": "varchar", "default_value": null}], "with_image": false
            }, {
                "id": 44,
                "memo": "cms_form",
                "name": "CMS form",
                "group_id": 8,
                "is_dealer": false,
                "master_id": null,
                "with_memo": true,
                "parameters": [{"id": 38, "memo": "CMS_FORM_BUTTONS", "name": "Ã‡ÒÒË‚ ÍÌÓÔÓÍ ÙÓÏ˚", "data_type": "varchar", "default_value": null}],
                "with_image": false
            }, {
                "id": 45,
                "memo": "wifi_hotspot",
                "name": "Wifi hotspot",
                "group_id": 4,
                "is_dealer": false,
                "master_id": 31,
                "with_memo": false,
                "parameters": [{
                    "id": 45, "memo": "WIFI_TIMELIMIT", "name": "Timelimit", "data_type": "int4", "default_value":
                        null
                }, {"id": 46, "memo": "WIFI_R_TRAFDOWN", "name": "Download traffic limit", "data_type": "int4", "default_value": null}, {
                    "id": 56, "memo": "WIFI_R_TRAFUP", "name": "Upload traffic limit", "data_type": "varchar", "default_value": null
                }, {
                    "id": 47,
                    "memo": "WIFI_R_DOWNSPEEDPERUSER",
                    "name": "Download speed limit per user",
                    "data_type": "int4",
                    "default_value": null
                }, {
                    "id": 55, "memo": "WIFI_R_UPSPEEDPERUSER", "name": "Upload speed limit per user",
                    "data_type": "varchar", "default_value": null
                }, {"id": 48, "memo": "WIFI_TIMEOUT", "name": "Session timeout", "data_type": "int4", "default_value": null}, {
                    "id": 49, "memo": "WIFI_R_SSID", "name": "Hot spot SSID", "data_type":
                        "varchar", "default_value": null
                }, {"id": 50, "memo": "WIFI_R_PPP_USER", "name": "Router PPP username", "data_type": "varchar", "default_value": null}, {
                    "id": 51, "memo": "WIFI_R_PPP_PASSWORD", "name": "Router PPP userpassword", "data_type": "varchar", "default_value": null
                }, {"id": 52, "memo": "WIFI_R_ADM_PASS", "name": "Router admin password", "data_type": "varchar", "default_value": null}, {
                    "id": 53, "memo": "WIFI_R_IDLE_TIMEOUT", "name": "Session idle timeout", "data_type": "int4", "default_value": null
                }, {"id": 57, "memo": "WIFI_R_PPP_ADDR", "name": "Route ppp framed ip address", "data_type": "cidr", "default_value": null}, {
                    "id": 58, "memo": "WIFI_SERIAL_NUM", "name": "Serial num", "data_type": "varchar", "default_value": null
                }, {"id": 54, "memo": "WIFI_R_WIFE_PASS", "name": "Default wpa password", "data_type": "varchar", "default_value": null}],
                "with_image": false
            }, {
                "id": 46,
                "memo": "cms_group_content",
                "name": "CMS group content",
                "group_id": 8,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": [{
                    "id": 59, "memo": "CMS_GROUP_CONTENT_ORDER", "name": "CMS group content order", "data_type": "varchar", "default_value": null
                }],
                "with_image": false
            }, {
                "id": 47,
                "memo": "booking_email",
                "name": "Booking email templates",
                "group_id": 6,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 48,
                "memo": "terminal_rotation",
                "name": "Terminal rotation",
                "group_id": 3,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 49,
                "memo":
                    "bill_template",
                "name": "Bill template",
                "group_id": 3,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }, {
                "id": 50,
                "memo": "bill_template_section",
                "name": "Bill template section",
                "group_id": 3,
                "is_dealer": false,
                "master_id": null,
                "with_memo": true,
                "parameters": null,
                "with_image": false
            }, {
                "id": 51, "memo": "promo", "name": "œÓÏÓ- ÍÓ‰˚", "group_id": 5, "is_dealer": false, "master_id": null,
                "with_memo": true, "parameters": null, "with_image": false
            }, {
                "id": 52,
                "memo": "application",
                "name": "Application",
                "group_id": 8,
                "is_dealer": false,
                "master_id": null,
                "with_memo": true,
                "parameters": [{
                    "id": 76, "memo": "BO_TITLE", "name": "Title", "data_type": "varchar", "default_value": null
                }, {"id": 74, "memo": "BO_EXPORT_URL", "name": "Report export URL", "data_type": "varchar", "default_value": null}, {
                    "id": 75, "memo": "BO_API_URL", "name": "API URL", "data_type": "varchar", "default_value": null
                }],
                "with_image": false
            }, {
                "id": 53,
                "memo": "operation_type",
                "name": "Operation type",
                "group_id": 4,
                "is_dealer": false,
                "master_id": null,
                "with_memo": true,
                "parameters": null,
                "with_image": false
            }, {
                "id": 54,
                "memo": "cms_image",
                "name": "CMS image",
                "group_id": 8,
                "is_dealer": false,
                "master_id": null,
                "with_memo": false,
                "parameters": null,
                "with_image": false
            }]
    }, "status": "OK"
};

const {data: {objects}} = sourceData;

const data = objects.map((item, i) => {
    if (i < 1) console.log(item);
    const {id, master_id, memo, name, parameters} = item;
    const res = {
        id,
        master_id,
        data: {
            umlName: name,
            umlType: 'block',
            operationsHeader: "values",
            operations: parameters?.map(item => {
                const {name, data_type} = item
                return {
                    name: name,
                    returnType: data_type,
                }
            })
        }
    };
    return res;
});

export const storeCells = {};
// @ts-ignore
export const storeLinks = [];
data.forEach((item, i)=>{
    // @ts-ignore
    storeCells[item.id] = new UMLClass({
        size: { width: 220 , height: 30},
        position: { x: Math.round(i/5) * 180, y: i%5 * 300 },
        padding: { bottom: 2 * MARGIN },
        ...item.data});
});

data.forEach((item, i)=>{
    if (!item.master_id) return;
    storeLinks.push(
        new Aggregation({
            // @ts-ignore
            source: { id: storeCells[item.id].id },
            // @ts-ignore
            target: { id: storeCells[item.master_id].id, anchor: { name: "right" } },
            labels: createLabels([
                {
                    type: "label-target",
                    content: "seed"
                },
                {
                    type: "multiplicity-target",
                    content: "1..*"
                }
            ])
        }));
});

export default data;