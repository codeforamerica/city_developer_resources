# City Developer API Documentation

### An API documentation app for cities that doesn't suck

## Development
`8/24/2012`
The documentation for this app is currently under development. Please check back soon for updates. 

## Deployment
### Apache

This API documentation app works great with the Apache2 web server. It assumes the following Apache site configuration:

* Apache is configured with the `mod_rewrite` module enabled (you can use a2enmod rewrite to enable this module if need be)
* A virtual server instance (or default) is configured with `AllowOverride all` on the app's root directory - example:

		<VirtualHost *:80>
		    ServerAdmin webmaster@localhost
		    DocumentRoot /var/www/[your_site]
		    <Directory />
		            Options FollowSymLinks
		            AllowOverride None
		    </Directory>
		    <Directory /var/www/[your_site]>
		            Options Indexes FollowSymLinks MultiViews
		            AllowOverride all
		            Order allow,deny
		            allow from all
		    </Directory>
		</VirtualHost>

***note: if any changes were made to enable mod_rewrite and/or configure a virtual host then you must restart apache***	

Once you have set your main Apache configuration, you can simply clone this application into the root directory you defined in the VirtualHost configuration. For example, if you said the VirtualHost document root is `/var/www/api_docs`, then you can run:

    $ cd /var/www
    $ git clone \
        git://github.com/codeforamerica/city_developer_resources.git \
        api_docs
        
Now you will have the api documentation app available on your server at /var/www/api_docs.

Note that the app root folder includes an `.htaccess` file. This file contains the necessary redirection for using the HTML5 History API (pushState) and the release distribution assets and looks like this:

    # Remove the trailing slash from routes
    DirectorySlash Off

    # Enable the RewriteEngine
    RewriteEngine on

    # Map resources to release distribution
    RewriteRule ^app/(.*)$ dist/release/$1 [NC,L]
    RewriteRule ^assets/js/libs/(.*)$ dist/release/$1 [NC,L]
    RewriteRule ^assets/css/(.*)$ dist/release/$1 [NC,L]

    # These conditions ensure that the file does not exist and that the current
    # request URI is not the index.
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_URI} !index

    # Redirect remaining requests to the index.html file
    RewriteRule (.*) index.html [NC,L]
    
You can modify this file as required but please be cautions about changing the RewriteRules since they are absolutly required in order for this application to function properly.

At this point, you should be able to navigate to the directory on your server that is hosting the instance of the app and view it.
    
<hr >

MISC NOTES:

City of Chicago Developer Resources (current): http://www.cityofchicago.org/city/en/narr/foia/sample_code0.html

This app was tested with:

    Node: 0.6.18
    NPM: 1.1.21
    bbb: 0.1.10

