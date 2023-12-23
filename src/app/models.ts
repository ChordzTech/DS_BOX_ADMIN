export class User {
    userid!: number;
    businessid!: string;
    userpassword!: string;
    username!: string;
    mobileno!: number;
    userrole!: string;
    useraccess!: string;
    androidid!: string;
    deviceinfo!: string;
    status!: string;
}

export class Business {
    businessid!: number;
    businessname!: string;
    address!: string;
    pincode!: number;
    contactno!: number;
    email!: string;
    geolocation!: string;
    marginlength!: number;
    marginwidth!: number;
    burstingfactor!: number;
    gsm!: number;
    rate!: number;
    flutefactor!: number;
    waste!: number;
    conversionrate!: number;
    profit!: number;
    tax!: number;
    estimatenote!: string;
    activationdate!: string;
    subscriptiondate!: string;
    multiuser!: number;
    status!: string;
    subscription!: string;
}

export class Subscription {
    subscriptionid!: number;
    subscription!: string;
    duration!: number;
    amount!: number;
    status!: string;
}

export class appConfig {
    // id!: number;
    configname!: string;
    configvalue!: string;
}

export class changePassword {
    adminid!: number;
    adminname!: string;
    mobileno!: number;
    adminpassword!: string;
    firebaseid!: number;
    fcmtoken!: number;
    deviceinfo!: number;
    status!: string;
}
