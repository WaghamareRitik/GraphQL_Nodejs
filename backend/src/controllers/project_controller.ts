import { ProjectService } from "../services/project_service"

export const ProjectController={

 getProjects(_:any,{limit,offset}:any){

  return ProjectService.getProjects(limit,offset)

 },

 getProject(_:any,{id}:any){

  return ProjectService.getProject(id)

 },

 createProject(_:any,args:any){

  return ProjectService.createProject(args)

 }

}