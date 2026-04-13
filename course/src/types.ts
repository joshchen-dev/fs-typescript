export interface HeaderProps {
  courseName: string
}

export interface ContentItem {
  name: string,
  exerciseCount: number
}

export interface ContentProps {
  courseParts: ContentItem[]
}

export interface TotalProps {
  total: number
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartDescriptionBase {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescriptionBase {
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;