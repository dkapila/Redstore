extends layout

block content
	header 
		h1(id = 'mainTitle') RedStore
		a(href = '/signout', id = 'signout')	Sign out

	#adminPanel
		h2 Welcome Admin!
		#listItem Services
		- each project in projects
			#serv
				p	Project  Name  : #{project.name}
				p   Provider Owner : #{project.owner}
				
		a(href = '/admin/services', class = 'adminPanelBtn') Services
		a(href = '/admin/users', class = 'adminPanelBtn') Users
		a(href = '/admin/projects', class = 'adminPanelBtn') Projects