import WebSocket from "ws";

export interface DataWs extends WebSocket {
	id?: string;
	name?: string;
	email?: string;
	image?: string;
}

export interface DataMessage {
	type: string;
	name: string;
	email: string;
	image: string;
}

export interface DataNewMessage {
	type: string
	data: {
		message: string;
		sender: string;
		receiver: string;
	}
}