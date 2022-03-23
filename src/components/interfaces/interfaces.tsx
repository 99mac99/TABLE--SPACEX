
 export interface ILaunch {
	id: string;
	mission_id: string[];
	launch_date_utc: number;
	mission_name: string;
	missions: (IMission | undefined)[];
}

export interface IMission {
	id: string;
	description: string;
}
export interface MyState {
	id: string | [];
	launches: ILaunch[];
	missions: IMission[];
}

export interface IState extends ILaunch {
	id: string;
	missions: (IMission | undefined)[];
}

export interface ISort {
	launch_date_utc: number;
	mission_name: string;
}

export interface IDescription {
	missions: (IMission | undefined)[];
}