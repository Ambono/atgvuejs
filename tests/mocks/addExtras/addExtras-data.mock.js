export const addExtrasData = {
    "data": {
        "extras": [
            {
                "id": 1,
                "title": "Lounge Experience",
                "image": "/assets/images/defaults/lobby.jpg",
                "description": "Relax in the lounge before the show",
                "status" : {
                    "id": 1,
                    "description": "available"
                },
                "attributes":[
                    {
                        "id": 1,
                        "type": "layout",
                        "value": "half"
                    },
                    {
                        "id": 2,
                        "type": "max_quantity",
                        "value": 5
                    }
                ],
                "prices": [
                    {
                        "id": 234,
                        "price": 50.00,
                        "description": "Full price",
                        "available": true
                    }
                ]
            },
            {
                "id": 2,
                "title": "Lounge Experience for kids",
                "image": "/assets/images/defaults/sweets.jpg",
                "description": "Includes a soft drink, activity pack and sweet treats",
                "status" : {
                    "id": 1,
                    "description": "available"
                },
                "attributes":[
                    {
                        "id":1,
                        "type": "layout",
                        "value": "half" 
                    },
                    {
                        "id": 2,
                        "type": "max_quantity",
                        "value": 5
                    }
                ],
                "prices": [
                    {
                        "id": 235,
                        "price": 10.00,
                        "description": "Full price",
                        "available": true
                    }
                ]
            },
            {
                "id": 3,
                "title": "Champagne Experience",
                "image": "/assets/images/defaults/champagne.jpg",
                "description": "Bottle of bubbly to enjoy in the interval",
                "status" : {
                    "id": 1,
                    "description": "available"
                },
                "attributes":[
                    {
                        "id":1,
                        "type": "layout",
                        "value": "horizontal" 
                    },
                    {
                        "id": 2,
                        "type": "max_quantity",
                        "value": 5
                    }
                ],
                "prices": [
                    {
                        "id": 235,
                        "price": 150.00,
                        "description": "Full price",
                        "available": true
                    }
                ]
            },
            {
                "id": 4,
                "title": "VIP Champagne Experience",
                "image": "/assets/images/defaults/wine.jpg",
                "description": "Make your visit unforgettable with a selection of luxury chocolates, and a 1/2 bottle of Veuve Clicquot champagne to share",
                "status" : {
                    "id": 1,
                    "description": "available"
                },
                "attributes":[
                    {
                        "id":1,
                        "type": "layout",
                        "value": "full" 
                    },
                    {
                        "id": 2,
                        "type": "max_quantity",
                        "value": 5
                    }
                ],
                "prices": [
                    {
                        "id": 235,
                        "price": 150.00,
                        "description": "Full price",
                        "available": true
                    }
                ]
            },
            {
                "id": 5,
                "title": "Souvenir Brochure and Bag",
                "image": "",
                "description": "Bespoke printed Lion King brochure and tote bag.",
                "status" : {
                    "id": 1,
                    "description": "available"
                },
                "attributes":[
                    {
                        "id":1,
                        "type": "layout",
                        "value": "half" 
                    },
                    {
                        "id": 2,
                        "type": "max_quantity",
                        "value": 5
                    }
                ],
                "prices": [
                    {
                        "id": 235,
                        "price": 150.00,
                        "description": "Full price",
                        "available": true
                    }
                ]
            },
            {
                "id": 6,
                "title": "Lion King Souvenir Bundle",
                "image": "",
                "description": "Lion King Souvenir Brochure, Mug, Canvas Bag, Poster and Key Ring.",
                "status" : {
                    "id": 1,
                    "description": "available"
                },
                "attributes":[
                    {
                        "id":1,
                        "type": "layout",
                        "value": "half" 
                    },
                    {
                        "id": 2,
                        "type": "max_quantity",
                        "value": 5
                    }
                ],
                "prices": [
                    {
                        "id": 235,
                        "price": 75.00,
                        "description": "Full price",
                        "available": true
                    }
                ]
            }
        ],
        "basket": {
            "offers": [
                {
                    "id": 654321,
                    "title": "The Lion King, Wed 1st Aug 7pm",
                    "datetime": "2018-08-01 19:00:00",
                    "price": 122.00,
                    "offered_seats": [
                        {   
                            "id": 131,
                            "price": {
                                "id": 123,
                                "price": 61.00,
                                "description": "Full price"
                            },
                            "seat": {
                                "id": 13,
                                "seat_block": "Stalls",
                                "seat": "B2"
                            }
                        },
                        {   
                            "id": 132,
                            "price": {
                                "id": 123,
                                "price": 61.00,
                                "description": "Full price"
                            },
                            "seat": {
                                "id": 14,
                                "seat_block": "Stalls",
                                "seat": "B3"
                            }
                        }
                    ]
                }
            ],
            "order": {
                "ecx_id": 123456789,
                "sub_total": 122.00,
                "fees": [
                    {
                        "description": "Delivery fee",
                        "price": 2.00
                    },
                    {
                        "description": "Booking fee",
                        "price": 5.00
                    }
                ]
            },
            "expiry_time": "2018-07-30 17:13:12"
        }
    },
    "code": 200
}
