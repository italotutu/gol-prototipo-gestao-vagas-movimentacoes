
export enum ViewType {
  HOME = 'home',
  OPEN_SOLICITATION = 'open-solicitation',
  CONSULTATION = 'consultation',
  APPROVAL = 'approval',
  TREATMENT = 'treatment',
  NEGOTIATION = 'negotiation',
  ADMISSION = 'admission'
}

export interface Solicitation {
  id: string;
  classification: string;
  vacancyId: string;
  department: string;
  status: string;
  slaStatus: string;
  slaColor: 'green' | 'red' | 'orange';
  roleName: string;
  date: string;
  preAdmissionStatus?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'pdf' | 'image';
}
